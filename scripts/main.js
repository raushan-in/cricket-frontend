
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
            <h4 class="team_name" style="font-family: Graduate;"><a href="javascript:getTeamDetail(${ele.pk})">${ele.name}</a></h4>
            <span class="state w3-opacity" style="font-family: Courier;">${ele.club_state}</span>
      </div>
    </div>`);
  });
}

const getTeamDetail = (team_id) => {
  alert(team_id)
}




const getData = async (path='', options={}) => {
    let response = await fetch(path, options);
    let data = await response.json()
    return data;
};








