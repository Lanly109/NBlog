# Lab 4 UML

# 主要业务逻辑

自动柜员机又称 ATM 机， 是指银行设置一种小型机器，利用一张信用卡大小的磁条卡或芯片卡上的芯片来记录客户的基本户口资料（通常称银行卡，或称金融卡、取款卡等），让客户可以透过机器自助办理取款和存款等银行柜台服务，一些客户把这种自助机器称为“取款机”。



其业务逻辑如下:

1. 首先，客户将银行卡插入读卡器，读卡器识别卡的真实性，并在显示屏上提示输入密码。
2. 客户通过键盘输入密码后，ATM验证密码是否有效。如果密码错误，会提供错误信息；如果正确，会提示客户选择业务。
3. 接下来，客户可以根据自己的需要进行存款、取款、查询账户、转账、修改密码等操作。
4. 客户选择后，显示屏会提供交互提示和操作确认。
5. 操作结束后，客户可以自由选择打印或不打印回单。
6. 银行职员可进行对 ATM 自动取款机的硬件维护和添加现金的操作。



# Question 1（用例图）

用例图捕捉了模拟系统中的动态行为，并且描述了用户、需求以及系统功能单元之间的关系。

用例图展示了一个外部用户能够观察到的系统功能模型图。

用例图由主角，用例和它们之间的关系组成。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDQ1YWVmY2ZiNjc5OTUwNWQyMmZiMTgwZDc3ZmRkNTJfYTV2QmJ5cEoyUVdlTDZTMDUzcGZrQjBHbUJ4eUxLVWFfVG9rZW46Ym94Y253SjFhMzVjZ3VvNVRPVE9meXlEMUpkXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)





对于取钱的用户来说，可以通过ATM取款机可以进行以下操作：取款、查询卡里金额、改变密码。银行官员也可以对用户的密码进行修改，如果用户忘记的话。除此之外还有ATM机的维护人员定期对ATM机进行开启关闭和维护。



箭头从用例到参与者表示用例产生一些参与者要使用的信息。这里取款记录则向银行提供取款的信息。

# Question 2（类图）

类图（Class Diagram）是面向对象系统建模中最常用和最重要的图，是定义其它图的基础。

类图主要是用来显示系统中的类、接口以及它们之间的静态结构和关系的一种静态模型。

类图不仅用于可视化描述和记录系统的不同方面，也为构建可执行代码的软件应用程序。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=NWNhM2NhZGFiNGE5MGE1ZmRkNDRhOGViYmMwZjE3OWZfRk94dXlBZ3RyQk1TeFNncnBSaXN1bkFlTkJBQmpzWVhfVG9rZW46Ym94Y25aMUNiNFlFa2xOSUdpUVg1NUo2Yk5lXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)



对于ATM取款机来说，其类共有：读卡器、屏幕、键盘、取钱机这类对硬件操作的，还有账户类作为一切的核心。

用户通过键盘进行取钱、退卡、输入密码、输入取钱金额等操作。

类之间的连线表示了类之间的通信关系。例如，账目类连接了ATM屏幕，因为两者之间要直接相互通信；取钱机和读卡机不相连，因为两者之间不进行通信。

# Question 3（对象图）

UML 对象图和类图一样反映系统的静态过程，但它是从实际的或原型化的情景来表达的。

UML 对象图显示某时刻对象和对象之间的关系。一个UML对象图可看成一个类图的特殊用例，实例和类可在其中显示。

UML 对象图是类图的实例，几乎使用与类图完全相同的标识。

由于对象存在生命周期，因此UML对象图只能在系统某一时间段存在。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=MjY3MWM1Mzc0NGZhMGEzZjNlNThmNTUzNWQ0Y2JkNTJfR0l5bUV4UUJ2UW50YXluVDFnZEJQMjVCc2hkSVZGeW1fVG9rZW46Ym94Y243dXNCcTNzM3hGYU9RMUhvVlZjNXNoXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)













对于ATM取款机来说，键盘、读卡器、取钱机、屏幕都是ATM取款机的一部分，而用户是独立于ATM取款机，与取款机交互的。







# Question 4（顺序图）

顺序图，又名时序图，序列图，循序图，是一种UML交互图，描述了对象之间发送消息的时间顺序显示多个对象之间的协作。参考ATM机一次取款的逻辑，我们设计对应的顺序图如下：

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=MmI2MWRhNGIxZmQ0YTUxZWJlMzVlZjBhNjc3ZTRiN2FfMXoyY1hXbXJtU1o3NUpOTXloZUFXU0RPblFhbWFzeG9fVG9rZW46Ym94Y25jcUVRTVg1T2EyZVIwSFVyV1cwTFpnXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)



用户进行一次取款操作，对应的取款流程为：

1. 插卡
   1. 读卡
   2. 屏幕进行初始化
   3. 通过银行账户打开账目
2. ATM屏幕提示用户输入其PIN
3. 用户向ATM机输入PIN
   1. ATM验证PIN
4. ATM提示选择事务
5. 用户选择事务
6. ATM提示输入金额
7. 用户输入金额
   1. ATM去账户取款
      1. 账户验证金额是否合理
   2. 账户扣除金额
   3. 账户缴款
   4. 账户缴收据
8. 最后退卡



# Question 5（协作图）

协作图是动态图的另一种表现形式，强调参加交互的各对象结构的信息。协作图是一种类图，包含类元角色和关联角色，而不仅仅是类元和关联。协作图强调参加交互的各对象的组织。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=NWVjNTdiYmQwZjFmZmY2MTUyNDU4ZGU2ZGMyYjM1ZDJfRU5IR1NlU1BtU29lUGVyT3QyRGg4WXBRZ2licko2M2pfVG9rZW46Ym94Y25wRWF6enFYUXNhTnIxR3hEY0hjUGNjXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)

从上图可以看到，当用户插入银行卡后，首先由读卡机对银行卡卡号进行读取，读取成功后一方面与银行进行交互获取用户信息，另一方面将信息交由ATM屏幕显示。ATM提示用户输入密码（PIN）。随后用户可以进行输入密码、选择事务、输入取款金额等操作。当用户进行取款时，ATM一方面会发送取款记录给银行，另一方面银行取款机将对应金额的金钱取出来。

由此可以看出，读卡机是与ATM屏幕和银行账户协作。而取钱操作是银行账户和取款机共同协作的结果。







# Question 6（活动图）

UML活动图是一种表述过程基理、业务过程以及工作流的技术。它可以用来对业务过程、工作流建模，也可以对用例实现甚至是程序实现来建模。

UML活动图基本上是代表流程形成一个活动到另一个活动的流程图。活动可以被描述为一个系统的操作。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQyNWNiZjI3Y2M0ZWUyMGY5ODcyMzU3NzYyMzY3MWNfbHlZOWZuWDNpVEZtWnZEcFRJTkNwdUlwVUFkNzJTRGNfVG9rZW46Ym94Y253RWp0Z1RjTnlxb2xzeVVpa2dKRmZoXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)



用户插入银行卡，读卡器读取银行卡后，被要求输入密码，当输入完密码后便由银行系统对银行卡号和密码进行验证。验证失败则ATM机会退卡，用户取卡。否则登录成功，ATM显示银行卡余额并提示用户下一步的操作。用户可以选择存款或取款操作。如果用户选择取款，则被要求输入取款金额，银行会对取款金额和剩余金额进行核对，金额非法则要求用户重新输入，否则就减少相应的余额，并给出对应的钞票。如果用户选择存款，则被要求放入钞票，ATM机会进行验钞，验证通过则让银行给相应账户添加相应金额，否则钞票会被退回。用户最终选择退卡操作，取卡后，活动结束。



# Question 7（状态图）

UML状态图是图表本身的名称，主要用于描述对象具有的各种状态、状态之间的转换过程以及触发状态转换的各种事件和条件。

UML状态图描述了一个状态机，可以被定义为一台机器，它定义了一个对象，这些状态控制外部或内部事件的不同状态。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=YmM1NTM4ZDk5ZGUzZDQ4Yjc1ZTQ3NDNkYTRmMGQxOWVfUDJyanNyeG1mZVQ3NDRuQU5FNFNhYkJSQjNzbVBBY2lfVG9rZW46Ym94Y256ek9BdTZ6TE5tbW53VzFnUVBaRHhoXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)



对于ATM取款机来说，核心状态就是银行账户，处于正常状态，当金额少于0时会变为透支状态，ATM无法给予取钱。当账户处于透支状态超过30天或者用户主动关闭账户，其账户会变为关闭状态，ATM无法识别该账户。



# Question 8（组件图）

UML 组件图又称为构件图，他描述的是在软件系统中遵从并实现一组接口的物理的、可替换的软件模块。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=NGJlMzU4OGUyNmU3NWRmODY1MDcwYWZhMjYyM2RkYzNfT2dEUkRmMUlLbmxMQVVNZXV0dHE0NFNRQVJJVlNlYm1fVG9rZW46Ym94Y25kbVBFc29YYzIzZW1jcjBFbjMwY2xiXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)

在本系统中, 我们可以对 ATM 屏幕, ATM 网络, ATM 键盘, 数据库, 日志系统以及数据管理员, 维护人员和用户构成组件的依赖映射. 另外, 本系统使用银行账户进行相关验证.





# Question 9（部署图）

部署图描述的是系统运行时的结构，展示了硬件的配置及其软件如何部署到网络结构中。

![img](https://sysumatrix.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY5NGRmMjdkNTA0Mjg0OWUxMDY0NjBlODk4NzIzMWVfR01INWpCYVpaUEpyRDJkTkh2Q2huOUsyMkllbWJ5Z21fVG9rZW46Ym94Y25rc1E1STRqUnZtZE1xSlpHNURuT3FjXzE2NDY5OTIzMTg6MTY0Njk5NTkxOF9WNA)

以上ATM取款机系统的部署图描绘了系统各节点上的运行资源安排，主要包括三类资源：

- ATM客户机
- 地区ATM服务器
- 银行数据库服务器

资源间关系主要有两类：

- ATM客户机与地区ATM服务器之间通过局域网连通
- 地区ATM服务器与银行数据库服务器之间通过专用网连通
