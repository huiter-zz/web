// 请将 AppId 改为你自己的 AppId，否则无法本地测试
var appId = 'gex133213mkff026wqemxj06pmdq9puz9yxkpzc45v6gg4j7';

// 请换成你自己的一个房间的 conversation id（这是服务器端生成的）
var roomId = '';

// 每个客户端自定义的 id
var clientId = '1239112932931';

// 用来存储 realtimeObject
var rt;

// 用来存储创建好的 roomObject
var room;

// 监听是否服务器连接成功
var flag = true;


function main() {
  if (!flag) {
    rt.close();
  }

  // 创建实时通信实例
  rt = AV.realtime({
    appId: appId,
    clientId: clientId,

    // 请注意，这里关闭 secure 完全是为了 Demo 兼容范围更大些
    // 具体请参考实时通信文档中的「其他兼容问题」部分
    // 如果真正使用在生产环境，建议不要关闭 secure，具体阅读文档
    // secure 设置为 true 是开启
    secure: false
  });

  // 监听连接成功事件
  rt.on('open', function() {
    flag = false;
    alert('服务器连接成功！');

    if (roomId) {
      // 获得已有房间的实例
      rt.room(roomId, function(object) {

        // 判断服务器端是否存在这个 room，如果存在
        if (object) {
          room = object;

          // 当前用户加入这个房间
          room.join(function() {

          });

          // 房间接受消息
          room.receive(function(data) {
            if (!msgTime) {
              // 存储下最早的一个消息时间戳
              msgTime = data.timestamp;
            }
            alert(data);
          });
        }
    } 
    else {
        // 如果服务器端不存在这个 conversation
        alert('服务器不存在这个 conversation，你需要创建一个。');

        // 创建一个新 room
        rt.room({
          // Room 的默认名字
          name: 'LeanCloud-Room',

          // 默认成员的 clientId
          members: [
            // 当前用户
            clientId
          ],
          transient: true,
          // 创建暂态的聊天室（暂态聊天室支持无限人员聊天，但是不支持存储历史）
          // transient: true,
          // 默认的数据，可以放 Conversation 名字等
          attr: {
          }
        }, function(obj) {

          // 创建成功，后续你可以将 room id 存储起来
          room = obj;
          roomId = room.id;
          alert('创建一个新 Room 成功，id 是：', roomId);
        });
    }

    });
  });

  // 监听服务情况
  rt.on('reuse', function() {
    alert('服务器正在重连，请耐心等待。。。');
  });

  // 监听错误
  rt.on('error', function() {
    alert('连接遇到错误。。。');
  });
}


function sendMsg() {

  // 如果没有连接过服务器
  if (flag) {
    alert('请先连接服务器！');
    return;
  }

  // 向这个房间发送消息，这段代码是兼容多终端格式的，包括 iOS、Android、Window Phone
  room.send({
    text: "啦啦啦啦"
  }, {
    type: 'text'
  }, function(data) {
    alert(data);
  });

}