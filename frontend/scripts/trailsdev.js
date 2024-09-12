let trilha = JSON.parse(sessionStorage.getItem('selectedtrail_description_orange'))
let trilhas = JSON.parse(sessionStorage.getItem('trails_orange'))
let contentAtual = 0
jQuery(function() {
    if(!user.admin){
        $('#addContent').hide()
    }
    $('#trilhatitle').html(`Trilha ${trilha.name}`)
    $('#trilhadescription').html(`Trilha de conhecimento sobre ${trilha.name}`)
    attProgressBar(trilha.Progress)
    carregaContentTrilhaAPI()
})



let contentsOBJ = {}
function carregaContentTrilhaAPI() {
    const idTrail = sessionStorage.getItem('selectedtrail_orange')

    settingsContents = {
        "url": `http://localhost:3000/trails/${idTrail}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": token
        },
    };
      
    $.ajax(settingsContents).done(function (response) {
        contentsOBJ = response
        carregaTela(contentsOBJ)
    });
 
    // $.ajax(settingsTrilhas).done(function (response) {
    //   let sessionValue = JSON.parse(sessionStorage.getItem('trails_orange'))
    //   if(!sessionValue){
    //     sessionStorage.setItem('trails_orange', JSON.stringify(response))
    //   }
    //   let trilhas = JSON.parse(sessionStorage.getItem('trails_orange'))
    //   carregaTrilhasTELA(trilhas)
    // });
}

function carregaTela(objetoAPI) {
    attProgressBar(objetoAPI.progress)
    carregaSide(objetoAPI.contents);
}

function ordenaOBJTOS(a, b) {
if(a.id > b.id) return 1
if(a.id < b.id) return -1
return 0
}
function carregaSide(contents) {
    const htmlSide = contents.sort(ordenaOBJTOS).map((content)=> {
        return (
            `
                <li class="list-group-item sidebar-menu-content d-flex justify-content-between px-2">
                    ${!user.admin ?
                    `<div class="form-check-label div-menu-content">
                        <input onclick="contentView(${content.id})" id="content-${content.id}" ${content.concluded? 'checked':''} class="form-check-input input-menu" type="checkbox" value="" value="${content.id}"" />
                    </div>`:
                    ''}
                    <button onclick="carregaContent(${content.id})" style="border: none; background: transparent" class="form-check-label btn-topic">${content.title}</button>
                    ${user.admin ?
                        `<button class="px-3" style="border:none; background:transparent" onclick="deletedContent(${content.id})"><svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash-icon">
                            <path d="M6.25 8.25C6.66421 8.25 7 8.58579 7 9V18C7 18.4142 6.66421 18.75 6.25 18.75C5.83579 18.75 5.5 18.4142 5.5 18V9C5.5 8.58579 5.83579 8.25 6.25 8.25Z" fill="#212529"/>
                            <path d="M10 8.25C10.4142 8.25 10.75 8.58579 10.75 9V18C10.75 18.4142 10.4142 18.75 10 18.75C9.58579 18.75 9.25 18.4142 9.25 18V9C9.25 8.58579 9.58579 8.25 10 8.25Z" fill="#212529"/>
                            <path d="M14.5 9C14.5 8.58579 14.1642 8.25 13.75 8.25C13.3358 8.25 13 8.58579 13 9V18C13 18.4142 13.3358 18.75 13.75 18.75C14.1642 18.75 14.5 18.4142 14.5 18V9Z" fill="#212529"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 4.5C19.75 5.32843 19.0784 6 18.25 6H17.5V19.5C17.5 21.1569 16.1569 22.5 14.5 22.5H5.5C3.84315 22.5 2.5 21.1569 2.5 19.5V6H1.75C0.921573 6 0.25 5.32843 0.25 4.5V3C0.25 2.17157 0.921573 1.5 1.75 1.5H7C7 0.671573 7.67157 0 8.5 0H11.5C12.3284 0 13 0.671573 13 1.5H18.25C19.0784 1.5 19.75 2.17157 19.75 3V4.5ZM4.17705 6L4 6.08853V19.5C4 20.3284 4.67157 21 5.5 21H14.5C15.3284 21 16 20.3284 16 19.5V6.08853L15.8229 6H4.17705ZM1.75 4.5V3H18.25V4.5H1.75Z" fill="#212529"/>
                        </svg></button>`:
                    ''}
                </li>
            `
        )
    })
    htmlSide.unshift(`
    <li class="nav-item w-100">
        <div class="title-track d-flex flex-row justify-content-start align-item-center">
            <h4>1. O início</h4>       
        </div>
    </li>`)
    htmlSide.push(`
    <li>
        <div class="title-track d-flex flex-row justify-content-start align-item-center">
        <h4>2. Conceitos básicos</h4>
        <svg xmlns="../assets/cadeado.png" width="20" height="22" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path
            d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
            />
        </svg>
        </div>
    </li>
    `)
    $('#sidecontents').html(htmlSide)
}


function carregaContent(id) {   
    const content = contentsOBJ.contents.find(content => content.id === id)
    $('#timecontent').html(content.duration)
    $('#titlecontent').html(content.title)
    let reference =''
    if(content.reference.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
        const index = content.reference.indexOf('youtube')
        if(index < 0){
            reference = `<a href="${content.reference}" target="_blank">${content.reference}</a>`
        }else{
            reference = `
            <iframe width="100%" height="800" src="https://www.youtube.com/embed/${content.reference.slice(32)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
        }
    } else {
        reference = content.reference
    }

    $('#bodycontent').html(reference)
    contentAtual = id

}

function contentView(id) {

    // settingsView = {
    //     "url": `http://localhost:3000/content/${id}`,
    //     "method": "POST",
    //     "timeout": 0,
    //     "headers": {
    //       "Authorization": token
    //     },
    //   };
      
    //   $.ajax(settingsView).done(function (response) {
        

    //   }).fail($(`#content-${id}`).checked = false)

    settingsView = {
        "url": `http://localhost:3000/content/${id}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": token
        },
        "success": function (data) {
            
            sessionTrailsOld = JSON.parse(sessionStorage.getItem('trails_orange'))
            idSelectionTrail = parseInt(sessionStorage.getItem('selectedtrail_orange'))
            selectedTrailOld = sessionTrailsOld.find(trail => trail.id === idSelectionTrail)
            const contentsAtt = contentsOBJ.contents.find(content => content.id === id)
            contentsAtt.concluded = !contentsAtt.concluded
            contentsARRATT = contentsOBJ.contents.map(content => {
                if(content.id === id){
                    return contentsAtt
                }
                return content
            })
            const concludedsATT = contentsARRATT.filter(content => content.concluded).length
            const totalcontents = contentsOBJ.contents.length
            const ProgressATT = Math.floor((concludedsATT/totalcontents) * 100)
            const contentsOBJATT = {
                contents: contentsARRATT,
                Progress: ProgressATT
            }
            contentsOBJ = contentsOBJATT
            trilha.Progress = ProgressATT
            trilha.Total_concluded = concludedsATT
            // const selectTrailATT = selectedTrailOld
            // console.log(contentsARRATT)
            // // console.log(trilha)
            // // selectedTrailOld.Total_concluded++ 
            // // sessionStorage.setItem('trails_orange', JSON.stringify())
            // // trails_orange
            // // console.log(contentsOBJ.contents.find(content => content.id === id))
            const newTrilhas = trilhas.map(content => {
                if(content.id === idSelectionTrail){
                    return trilha
                }
                return content
            })
            sessionStorage.setItem('trails_orange', JSON.stringify(newTrilhas))
            sessionStorage.setItem('selectedtrail_description_orange', JSON.stringify(trilha))
            attProgressBar(ProgressATT)
        },
        "error": function (err) {
            $(`#content-${id}`).checked = false
        }
      };
      
      $.ajax(settingsView)
}

function attProgressBar(progress) {
    if(!user.admin){
        const htmlProgress = `
            <div class="progress">
                <div
                    class="progress-bar bar1-progress"
                    role="progressbar"
                    aria-label="Example with label"
                    style="width: ${progress}%"
                    aria-valuenow="${progress}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    ${progress}%
                </div>
            </div>
        `
        
        $('#progressbar').html(htmlProgress)
    }
}

function deletedContent(id) {
    settingsDeleted = {
        "url": `http://localhost:3000/content/${id}`,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Authorization": token
        },
        "success":function (data) {
            carregaContentTrilhaAPI()
        },
        "error": function (err) {
            
        }
    };
      
      $.ajax(settingsDeleted)
}

function nextContent() {
    let novoContent
    if(!contentAtual){
        novoContent = 1
    } else {
        novoContent = contentAtual+1;
    }
    if(novoContent > trilha.Total_contents){
        window.location.assign("../trilhas/trilhas.html");
        return
    }
    carregaContent(contentAtual+1)
    contentView(novoContent)
}


    // <li class="list-group-item sidebar-menu-content d-flex justify-content-start">
    //     <div class="form-check-label div-menu-content">
    //         <input class="form-check-input input-menu" type="checkbox" value="${content.id}" id="${content.id}" />
    //     </div>
    //     <a href="#" class="form-check-label btn-topic">${content.title}</a>
    // </li>