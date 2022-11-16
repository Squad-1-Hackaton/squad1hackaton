let trilhas = []

function logoff() {
    sessionStorage.removeItem('token_orange')
    sessionStorage.removeItem('user_orange')
    sessionStorage.removeItem('trails_orange')
    sessionStorage.removeItem('selectedtrail_orange')
    sessionStorage.removeItem('selectedtrail_description_orange')

    window.location.replace("../cadastro/home.html");
}

jQuery(function() {
  carregaTrilhasAPI()
})

function carregaTrilhasAPI() {
  settingsTrilhas = {
    "url": "http://localhost:3000/trails",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": token
    },
  };
      
  $.ajax(settingsTrilhas).done(function (response) {
    let sessionValue = JSON.parse(sessionStorage.getItem('trails_orange'))
    if(!sessionValue){
      sessionStorage.setItem('trails_orange', JSON.stringify(response))
    }
    trilhas = JSON.parse(sessionStorage.getItem('trails_orange'))
    console.log(trilhas)
    carregaTrilhasTELA(trilhas)
  });
}



// $.ajax(settingsTrilhas).done(function (response) {
//   // if(!sessionStorage.getItem('trails_orange')){
//   //   sessionStorage.setItem('trails_orange', JSON.stringify(response))
//     trilhas = response
//     carregaTrilhas(trilhas)
//   // } else {
//   //   sessionStorage.removeItem('trails_orange')
//   // }
// })



function regitraTrilha(id) {
  const settingsRegister = {
    "url": `http://localhost:3000/trails/${id}`,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Authorization": token
    },
  };

  $.ajax(settingsRegister).done(function (response) {
    $(`#${id}`).text('Continuar trilha').on('click', acessarTrilha)
    sessionStorage.removeItem('trails_orange')
    carregaTrilhasAPI()
    window.location.assign("../trilha-dev/trilha-dev.html");
  });
}

function acessarTrilha(id) {
  sessionStorage.setItem('selectedtrail_orange', id)
  sessionStorage.setItem('selectedtrail_description_orange', JSON.stringify(trilhas[id-1]))
  window.location.assign("../trilha-dev/trilha-dev.html");
}

function deletedButton(id){
  deletedAPI(id)
}
function deletedAPI(id) {
  settingsDelete = {
    "url": `http://localhost:3000/trails/${id}`,
    "method": "DELETE",
    "timeout": 0,
    "headers": {
      "Authorization": token
    },
  };
  
  $.ajax(settingsDelete).done(function (response) {
    sessionStorage.removeItem('trails_orange')
    carregaTrilhasAPI()
  });
}

function ordenaOBJTOS(a, b) {
  if(a.id > b.id) return 1
  if(a.id < b.id) return -1
  return 0
}
function carregaTrilhasTELA(trails){
  $('.titulo-inicial').text(user.name)
  const htmlinner = trails.sort(ordenaOBJTOS).map((content, index) => {

    let txtButton = ''
    let actionButton = ''
    let deletedButton = ''
    // if(user.admin){
    //   txtButton = 'Acessar trilha'
    //   actionButton = 'acessarTrilha()'
    //   deletedButton = `deleteTrilha(${content.id})`
    // } else {
    if(user.admin){
      txtButton = 'Acessar trilha'
      actionButton = `acessarTrilha(${content.id})`
      deletedButton = `deletedButton(${content.id})`
    } else {
      if(content.registered && content.Progress !== 100){
        txtButton = 'Continuar trilha'
        actionButton = `acessarTrilha(${content.id})`
      } else if (content.registered && content.Progress === 100){
        txtButton = 'Trilha concluída'
        actionButton = `acessarTrilha(${content.id})`
      } else {
        txtButton = 'Registrar na trilha'
        actionButton = `regitraTrilha(${content.id})`
      }
    }
    // }
      return `
      <div class="card h-100 m-4">
          <img
              src="../assets/Trilha${index + 1}.png"
              class="card-img-top"
              alt="..."
          />
          <div class="card-body">
              <h5 class="card-title">${content.name}</h5>
              <p class="card-text">
                  Um trilha de conhecimento feita para você que quer evoluir
                  seus conhecimentos em ${content.name}!
              </p>
              ${!user.admin ? 
                `
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: ${content.Progress}%" aria-valuenow="${content.Progress}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
                :
                '' 
              }
              <div class="div-card-btns d-flex flex-column justify-content-around">
                  <button onclick="${actionButton}" class="btn btn-dark btn-card-access">
                    ${user.admin ? 'Acessar trilha' : txtButton}
                  </button>
                  ${user.admin ? 
                    `
                    <button onclick="${deletedButton}" class="btn btn-dark btn-card-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        Deletar trilha
                    </button>
                    ` :
                    ''
                  }
              </div>
          </div>
      </div>
      `
    })
  $('#trilhascontent').html(htmlinner)
}
