$(function(){
    const socket = io();
    const messageForm = $('#message-form');
    const message = $('#message');
    const chat = $('#chat');

    const usernameForm = $('#username-form');
    const username = $('#username-txt');

    const users = $('#users');
    
    let usernameAux = '';

    

    //Send message
    messageForm.submit(e =>{
        e.preventDefault();
        socket.emit('send message', message.val());
        message.val('');
    })  


    socket.on('new message', function(data){
        chat.append('<div class="well" style="background-color:#f0f0ae"><strong>' + data.username + '</strong>: ' + "<br>" + data.msg + '</div>')
    })

    //Set username

    usernameForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', username.val(), data => {
            if(data){
                usernameAux = username.val();
                $('#user-wrap').hide();
                $('#content-wrap').show();
            }
            else{
                $('#error').html("<div class='alert alert-danger'>Username already taken</div>")
            }
            username.val('');
        });
    
    }

    )

    socket.on('get users', (data) =>{
        let html = "";
        let color = "";
        let logout = "";
        for(let i = 0; i < data.length; i++){
            if (data[i] == usernameAux){
                color = "#00ff00";
                logout = '<a href="/">Logout</a>';
            }
            else{
                color = "#ff0000";
                logout = '';
            }
            html +=  `<p style="color:${color}">${data[i]} ${logout}</p>`;
        }
        users.html(html);
    })

})