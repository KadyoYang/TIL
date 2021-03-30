<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="/resources/js/chatClient.js"></script>
</head>

<body>
    <p>This is a simple chat system implemented using WebSockets. It works by sending packets of JSON back and forth
        with the server.</p>
    <p class="mdn-disclaimer">This text and audio/video chat example is offered as-is
        for demonstration purposes only, and should not be used for any other
        purpose.</p>
    <p>Enter a username: <input id="name" type="text" maxlength="12" placeholder="Your name">
        <input type="button" name="login" value="Log in" onclick="connect()">
    </p>
    
    <table border="0" width="100%">
        <tr height="100%">
            <td width="120px" align="top" border="1" height="100%">
                <div id="userlistbox" style="border: 1px solid black; width:100%; height:100%;"></div>
            </td>
            <td>
                <iframe width="100%" height="400px" id="chatbox""></iframe>
    <tr>
    <td>&nbsp;</td>
    <td>
    <p>
    Chat: <input id="text" type="text" name="text" size="80" maxlength="256" placeholder="Chat with us!"
                    autocomplete="off" onkeyup="handleKey(event)" disabled>
                    <input type="button" id="send" name="send" value="Send" onclick="send()" disabled></p>
            </td>
            </td>
        </tr>
    </table>



</body>

</html>