
const base = "http://127.0.0.1:8000"


$( document ).ready(function() {
  getData(base+'/team/list/')
  .then(data  => renderTeam(data));
});


const renderTeam = (data) => {
  $("#header").html("TEAMS")
  let content_area = $("#contents")
  content_area.empty();
  data.forEach(ele => {
    content_area.append(`
    <div class="w3-third w3-margin-bottom">
    <img src="${ele.logo}" height="150" width="42" style="width:100%; border-radius:10%;" class="w3-hover-opacity">
      <div class=" w3-transparent" style="text-align:center">
            <h4 class="team_name" style="font-family: Graduate;"><a href="javascript:getTeamDetail(team_id=${ele.pk}, team_name='${ele.name}')">${ele.name}</a></h4>
            <span class="state w3-opacity" style="font-family: Courier;">${ele.club_state}</span>
      </div>
    </div>`);
  });
}

const getTeamDetail = (team_id=0, team_name="") => {
    if (team_id != 0){
      getData(base+`/team/players/${team_id}/`)
      .then(data  => renderTeamDetail(team_name, data));
    }
}

const renderTeamDetail = (team_name, data) => {
  $("#header").html(team_name.toUpperCase())
  let content_area = $("#contents")
  content_area.empty();
  data.forEach(ele => {
    let player_name = `${ele.first_name} ${ele.last_name}`
    content_area.append(`
    <div class="w3-third w3-margin-bottom">
    <img src="${ele.image}" height="150" width="31" style="width:100%; border-radius:50%;" class="w3-hover-opacity">
      <div class=" w3-transparent" style="text-align:center">
            <h4 class="player_name" style="font-family: Graduate;"><a href="javascript:getPlayerStats(player_id=${ele.pk}, player_name='${player_name}')">${player_name}</a></h4>
            <span class="role" style="font-family: Courier; color:red;" title="Role">${ele.role}</span> |
            <span class="circle" title="Jersey Number"> ${ele.jersey_number}</span> |
            <span class="country" style="font-family: Courier; color:orange" title="Country Name">${ele.country}</span>
      </div>
    </div>`);
  });
}

const getPlayerStats = (player_id=0, player_name="") => {
  if (team_id != 0){
    $("#statsModal").modal("show");
    $('.modal-title').html(`Player : <spam style="color:green"> ${player_name}</spam>`);
    getData(base+`/player/stats/${player_id}/`)
    .then(data  => updateModalBody(data));
  }
}

const updateModalBody = (data) => {
  $('.modal-body').html('Unavailable');
  if (data.pk != undefined){
      let body = `<ul>
            <li>Match : ${data.match_count}</li>
            <li>Run : ${data.total_run}</li>
            <li>Century : ${data.hundreds}</li>
            <li>Fifty : ${data.fifties}</li>
            <li>Highest Score : ${data.highest_score}</li>
            <li>Wicket : ${data.total_wicket}</li>
            <li>Role : ${data.role}</li>
          </ul>`
      $('.modal-body').html(body);
  }
}

const getData = async (path='', options={}) => {
    let response = await fetch(path, options);
    let data = await response.json()
    return data;
};

