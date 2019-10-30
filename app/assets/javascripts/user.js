$(function (){

  function  buildUserList(users){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ users.name }</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ users.id }" data-user-name="${ users.name }">追加</div>
              </div>
              `
    $('#user-search-result').append(html);
  }

  function  showNoUser(){
    var html = `
                <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    $('#user-search-result').append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
                <div class="chat-group-user clearfix" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="chat-group-user__btn--remove chat-group-user__btn" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>`;
    $(".js-add-user").append(html);
  }


  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $('#user-search-field').on('keyup', function(){
    let input = $('#user-search-field').val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      console.log(users);
      $('#chat-group-user').empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          buildUserList(user);
        });
      } else if(input.length == 0) {
        return false;
      } else {
        showNoUser();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on('click', '.user-search-add',function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    console.log(userName);
    console.log(userId);
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });

});