var tabBtn = $("#tab-btn > ul > li");     //각각의 버튼을 변수에 저장
var tabCont = $("#tab-cont > div");       //각각의 콘텐츠를 변수에 저장

//컨텐츠 내용을 숨겨주세요!
tabCont.hide().eq(0).show();

tabBtn.click(function(){
  var target = $(this);         //버튼의 타겟(순서)을 변수에 저장
  var index = target.index();   //버튼의 순서를 변수에 저장
  //alert(index);
  tabBtn.removeClass("active");    //버튼의 클래스를 삭제
  target.addClass("active");    //타겟의 클래스를 추가
  tabCont.css("display","none");
  tabCont.eq(index).css("display", "block");
});


const req_reload = () => {
  // fetch to /reload method post
  fetch('/reload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'length': data.length}),
  })
    .then(response => response.json())
    .then(data => {
      if (data.reload == true) {
        location.reload();
      }
    });
}

// 
let water = document.getElementById('watering');
water.addEventListener('click', function () {
  // if water disabled not fetch
  if (water.disabled == true) {
    return;
  }

  // fetch to /water
  fetch('/water', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'water': true,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  
  // disable button
  water.disabled = true;
  water.style.backgroundColor = 'gray';
  water.style.color = 'white';
  water.style.cursor = 'not-allowed';
  water.style.opacity = '0.5';
  water.style.transition = 'all 0.5s ease-in-out';
  // enable button after 5 seconds
  setTimeout(function () {
    water.disabled = false;
    water.style.backgroundColor = '#4CAF50';
    water.style.color = 'black';
    water.style.cursor = 'pointer';
    water.style.opacity = '1';
  }, 10000);

  // button hover effect
  water.addEventListener('mouseover', function () {
    water.style.backgroundColor = '#3e8e41';
  });
  water.addEventListener('mouseout', function () {
    water.style.backgroundColor = '#4CAF50';
  });

  // button active effect
  water.addEventListener('mousedown', function () {
    water.style.backgroundColor = '#3e8e41';
    water.style.boxShadow = '0 2px rgb(180, 180, 180);';
    water.style.translate = 'translateY(4px)';
  });
  water.addEventListener('mouseup', function () {
    water.style.backgroundColor = '#4CAF50';
    water.style.boxShadow = '0 2px rgb(180, 180, 180);';
    water.style.translate = 'translateY(0px)';
  });
});