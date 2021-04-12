// create image html tag



function imageTag(ele) {
    const image = document.createElement('img');
    image.setAttribute('src', `${ele.path}`)
    image.setAttribute('alt', `${ele.name}`)
    image.setAttribute('id', ele.name)

    // show compress button
    const btn = document.createElement('button');
    // btn.setAttribute('id', ele.name)
    btn.innerText = "Compress"
    getElement('show-image').appendChild(btn)
    btn.setAttribute('class', 'btn btn-primary')

    // compress image button addevent lisner
    btn.addEventListener('click', async (e) => {
        try {
            const url = `http://localhost:3000/compress`
            const data = JSON.stringify(ele)
            const senddata = {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }
            console.log('btn click');
            fetch(url, senddata).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);

                window.location = `http://localhost:3000/download/${data.image}`
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            return error
        }






    })

    return image

}







function compress(e) {

}


// bytes to kb and mb 
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// My File upload progress bar
function getElement(params) {
    return document.getElementById(params)
}
//multiple file upload
function myuploadfiles() {
    const file = getElement('myfile1').files
    for (const i of file) {
        myuploadfile(i)
    }

}

function myuploadfile(file) {
    const formdata = new FormData();
    formdata.append('myfile1', file)
    const ajax = new XMLHttpRequest()
    ajax.upload.addEventListener("progress", myProgressHandler, false);
    ajax.addEventListener("load", myCompleteHandler, false);
    ajax.addEventListener("error", myErrorHandler, false);
    ajax.addEventListener("abort", myAbortHandler, false);
    ajax.open("POST", "http://localhost:3000/upload");
    ajax.send(formdata);
}

function myProgressHandler(event) {
    console.log();
    getElement("myloaded_n_total").innerHTML = "Uploaded " + formatBytes(event.loaded) + " of " + formatBytes(event.total);
    const percent = (event.loaded / event.total) * 100;
    console.log(percent);
    getElement("myprogressBar").value = Math.round(percent);
    getElement("mystatus").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

async function myCompleteHandler(e) {
    if (e.target.status === 200) {
        const json = await JSON.parse(e.target.responseText)
        getElement('show-image').appendChild(imageTag(json.compress))

    }

}

function myErrorHandler(event) {
    console.log('this is an error', event.target.responseText);
}


function myAbortHandler(event) {
    getElement("mystatus").innerHTML = "Upload Aborted";
}



// document.querySelector('.btn-danger').addEventListener('click', compress)

// function compress(params) {
//     console.log('count event');
//     const obj = {
//         name: "namz",
//         r: 23,
//         collage: "damdama"
//     }
//     JS(`${obj}`)
// }
// function JS(params) {
//     console.log(params);
// }