$( document ).ready(function() {
  getData('/team/list/')
  .then(data  => updateChoiceField(data));
});


const updateChoiceField = (data) => {
    data.forEach(ele => {
        $('#team1').append(`<option value="${ele.pk}"> ${ele.name} </option>`); 
        $('#first_team').append(`<option value="${ele.pk}"> ${ele.name} </option>`); 
        $('#team2').append(`<option value="${ele.pk}"> ${ele.name} </option>`);
        $('#second_team').append(`<option value="${ele.pk}"> ${ele.name} </option>`);
    });
}

$("#teams_compare").submit(function (e) { 
    e.preventDefault();
    inputs={};
    input_serialized =  $(this).serializeArray();
    input_serialized.forEach(field => {
        inputs[field.name] = field.value;
    })
    
    if (inputs['first_team_id'] == inputs['second_team_id']){
      sameSelectionError()
    }else{
      getComparison(inputs);
      $("#teams_compare").trigger("reset");
    }
    
  });

  let getComparison = (inputs) =>{
    getData(`/match/filter/${inputs['first_team_id']}/${inputs['second_team_id']}/`)
            .then(data  => renderComparison(data));
  }

  const renderComparison = (data) => {
    $("#contents").empty()
    $("#com-header").empty()

    if(Object.keys(data).length > 0){
        const team_1 = data[0]['winner_team_name']
        const team_2 = data[0]['looser_team_name']
        
        $("#com-header").html(`<hr style="border-top: dotted 1px;" />${team_1.toUpperCase()}
        <span style="font-family:fantasy; color:red">Vs</span> ${team_2.toUpperCase()}`);
        var contants_area = $("#contents")
        
        data.forEach(ele => {
            IST = new Date(ele.created)
            match_date = `${getMonth(IST.getMonth())} ${IST.getDate()}, ${IST.getFullYear()}`
            contants_area.append(`<div class="w3-third w3-margin-bottom">
              <div class="w3-transparent w3-border" style="text-align:center; padding-top: 5px;">
                    <div class="winner" title="Score">${ele.winner_team_name} : ${ele.winner_points}</div> 
                    <div class="looser" title="Score">${ele.looser_team_name} : ${ele.looser_points}</div>
                    <div class="result" title="Winner"><i class="fa fa-trophy" style="font-size:15px; color:white"></i>&nbsp;&nbsp;
                                                        ${ele.winner_team_name}&nbsp;&nbsp; <i class="fa fa-trophy" style="font-size:15px; color:white"></i></div>
                    <div class="match_date" title="Match Date">${match_date}</div>
              </div>
            </div>`);
            });
    }else{
        $("#com-header").html(`<hr> No match found.`);
    }
  }



const getMonth = (month_array) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month_array]
}


$( ".draggable" ).draggable({});
$('.draggable').click(function(e){});
$(".draggable").effect( "shake" );

$(".play-btn").click(function() {
    $("#playModal").modal('show');
});


$("#playModalForm").submit(function (e) { 
  e.preventDefault();
  inputs={};
  input_serialized =  $(this).serializeArray();

  input_serialized.forEach(field => {
      inputs[field.name] = field.value;
  })
  
  if (inputs['first_team'] == inputs['second_team']){
      $("#teams_compare").trigger("reset");
      sameSelectionError()
  }else{
    $("#play-submit-btn").prop('disabled', true);
    getMatchResult(inputs);
  }
});


let getMatchResult = (inputs) =>{
  const options = {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  getData(`/match/create/`, options)
          .then(data  => renderMatchResult(data));
}

const renderMatchResult = (data) => {
  $("#play-submit-btn").prop('disabled', false);
  $("#teams_compare").trigger("reset");
  $("#playModal").modal('hide');

  bothSideConfetti();
  
  Swal.fire({
    title: `'${data.winner_team}' won the match.`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

const sameSelectionError = () =>{
  Swal.fire({
    icon: 'error',
    title: 'Selected teams should be different.',
  })
}
