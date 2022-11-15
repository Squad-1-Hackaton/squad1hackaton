
function logoff() {
    sessionStorage.removeItem('token_orange')
    sessionStorage.removeItem('user_orange')
    sessionStorage.removeItem('trails_orange')

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
    let trilhas = JSON.parse(sessionStorage.getItem('trails_orange'))
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
    let trails = JSON.parse(sessionStorage.getItem('trails_orange'))
    let novaTrilha = trails.map(trilha => {
      if(trilha.id === id) {
        trilha.registered = true
      }
      return trilha
    })
    sessionStorage.removeItem('trails_orange')
    sessionStorage.setItem('trails_orange', JSON.stringify(novaTrilha))
  });
}

function acessarTrilha() {
  // window.location.href="../trilha-dev/trilha-dev.html"
  window.location.assign("../trilha-dev/trilha-dev.html");
}

function carregaTrilhasTELA(trails){
  $('.titulo-inicial').text(user.name)
  const htmlinner = trails.map((content, index) => {
    let txtButton =''
    let actionButton
    if(user.admin){
      txtButton = 'Acessar trilha'
      actionButton = 'acessarTrilha()'
    } else {
      if(content.registered && content.Progress !== 100){
        txtButton = 'Continuar trilha'
        actionButton = 'acessarTrilha()'
      } else if(content.registered && content.Progress === 100){
        txtButton = 'Trilha concluída'
        actionButton = 'acessarTrilha()'
      }else{
        txtButton = 'Iniciar trilha'
        actionButton = `regitraTrilha(${content.id})`
      }
    }
    return (
      `<div class="col p-5">
        <div class="card h-100">
            <img src="../assets/Trilha${index + 1}.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${content.name}</h5>
              <p class="card-text">
                Um trilha de conhecimento feita para você que quer evoluir
                seus conhecimentos em ${content.name}!
              </p>
              ${user.admin ? '': `
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${content.Progress}%" aria-valuenow="${content.Progress}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>`}
              <button id="${content.id}" class="btn btn-dark" onclick="${actionButton}">${txtButton}</button>
            </div>
        </div>
      </div>` 
    )
  })
  $('#trilhascontent').html(htmlinner)
}
