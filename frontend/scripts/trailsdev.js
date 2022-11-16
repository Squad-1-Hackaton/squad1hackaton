let trilha = JSON.parse(sessionStorage.getItem('selectedtrail_description_orange'))
let trilhas = JSON.parse(sessionStorage.getItem('trails_orange'))

jQuery(function() {
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
                <li class="list-group-item sidebar-menu-content d-flex justify-content-start">
                    ${user.admin ?
                        '':
                        `
                        <div class="form-check-label div-menu-content">
                            <input id="content-${content.id}" ${content.concluded? 'checked':''} class="form-check-input input-menu" type="checkbox" onclick="contentView(${content.id})" value="${content.id}" id="${content.id}" />
                        </div>
                        `
                    }
                    <button onclick="carregaContent(${content.id})" class="form-check-label btn-topic">${content.title}</button>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
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
            <iframe width="100%" height="500" src="https://www.youtube.com/embed/${content.reference.slice(32)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
        }
    } else {
        reference = content.reference
    }

    $('#bodycontent').html(reference)
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
            console.log('Trilhas =>', trilhas)
            console.log('TrilhaAtualizada =>', trilha)
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


    // <li class="list-group-item sidebar-menu-content d-flex justify-content-start">
    //     <div class="form-check-label div-menu-content">
    //         <input class="form-check-input input-menu" type="checkbox" value="${content.id}" id="${content.id}" />
    //     </div>
    //     <a href="#" class="form-check-label btn-topic">${content.title}</a>
    // </li>