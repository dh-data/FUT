import React, { useEffect, useState, useRef } from 'react'
import { Ellipsis, Settings, Trash2, MessageCircle, LogOut ,ChevronLeft, ChevronRight } from 'lucide-react'  // 引入图标
import { getUserChatList } from '@/api/chat' // 导入封装的 axios 实例
import { Input } from '@/components/ui/input'
import { useLocation, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx' // 引入 clsx 来简化动态样式绑定
import { Button } from '@/components/ui/button'
import chatIcon from '@/assets/images/chat.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Value } from '@radix-ui/react-select'

//   样式
const triggerClass = 'cursor-pointer hover:bg-[#ccc] rounded-[12px]'
const dataItemClass =
  'relative pl-[10px] pr-[10px] hover:bg-[var(--bg-color-hover)] rounded-[12px] cursor-pointer'
const ellipsisClass =
  'cursor-pointer text-[12px]  rounded-[50%] pl-[2px] pr-[2px]  bg-[var(--bg-color-hover)] hover:bg-[#fff]'
const chatBtnClass =
  'flex items-center pl-[10px] pr-[10px] h-[44px] w-[130px] rounded-[14px] text-[16px] text-[#4d6bfe] bg-[rgba(219,234,254)] hover:bg-[#c6dcf8]  cursor-pointer'
  // 个人信息变量  
const userInfoDropdownMenuClass='flex items-center  cursor-pointer hover:bg-[#f5f5f5] '
const userInfoButtonColor='text-[#4d6bfe]' 

const SidebarComponent = () => {
  const navigate = useNavigate()

  const [isCollapsed, setIsCollapsed] = useState(false);  // 添加收起状态
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeHeader, setActiveHeader] = useState<number | null>(null)
  const headersRef = useRef<{ [key: number]: HTMLElement }>({})
  const [isSticky, setIsSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 替换为你的 API 端点
    getUserChatList()
      .then(({ data }) => {
        // setDataSource({ ...dataSource, ...data })
        console.log(data, '<<<')
      })
      .catch(err => {
        console.error('Error fetching data:', err)
      })
  }, [])
  // 数据集合
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      title: '标题',
      day: 7,
      children: [
        {
          id: 11,
          title: '标题'
        },
        {
          id: 12,
          title: '标题'
        },
        {
          id: 13,
          title: '标题'
        },
        {
          id: 14,
          title: '标题'
        },
        {
          id: 15,
          title: '标题'
        }
      ]
    },
    {
      id: 21,
      title: '标题标题标题标题标题标题标题',
      day: 10,
      children: [
        {
          id: 21,
          title: '标题'
        },
        {
          id: 22,
          title: '标题'
        },
        {
          id: 23,
          title: '标题'
        },
        {
          id: 24,
          title: '标题'
        },
        {
          id: 25,
          title: '标题'
        }
      ]
    }
  ])
  // 选中的id
  const [selectedId, setSelectedId] = useState(null)
  const [dropdownData, setDropdownData] = useState({
    title: '',
    id: null
  })
  const [editingTitle, setEditingTitle] = useState('')
  // 选择数据
  const handleSelData = item => {
    console.log(item, 1)
    setSelectedId(item.id)
    navigate(`/chat/${item.id}`)
  }

  // 重命名
  const handleEditStart = (item, event) => {
    event.stopPropagation()
    console.log(item, 2, event)
    // 设置编辑数据
    setDropdownData({ ...dropdownData, ...item })
  }
  // 输入框值改变时更新编辑数据
  const setEditingData = value => {
    setEditingTitle(value)
    setDropdownData({ ...dropdownData, title: value })
  }
  // 输入框失去焦点时保存修改
  const handleBlur = () => {
    console.log(dropdownData, '>>>失去焦点')
    // setDataSource(dataSource.map((item)=>{
    //     if(item.id==dropdownData.id){
    //         return {...item,title:dropdownData.title}
    //     }else{
    //         return item
    //     }
    // }))
    // 并初始化
    setDropdownData({ title: '', id: null })
  }

  // 删除数据
  const handleDeleteData = id => {
    console.log(id, '>>>删除')
    // setDataSource(dataSource.filter((item)=>item.id!=id))
  }

  // 提取工具提示组件
  const TooltipItem = ({ title, className }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className} asChild>
            <div className="overflow-hidden h-[38px]">{title}</div>
          </TooltipTrigger>
          <TooltipContent className="bg-black shadow-lg border-0">
            <div className="text-white text-[14px] max-w-[200px] overflow-hidden">
              {title}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // 提取下拉菜单组件
  const DropdownMenuComponent = ({
    item,
    handleEditStart,
    handleDeleteData
  }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="absolute top-[15%] right-[10px]"
          asChild
        >
          <Ellipsis
            className={clsx(
              ellipsisClass,
              item.id === selectedId
                ? ellipsisClass
                : `${ellipsisClass} group-hover:opacity-100 opacity-0`
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#fff] border-0">
          <DropdownMenuItem
            className={triggerClass}
            onClick={e => handleEditStart(item, e)}
          >
            重命名
          </DropdownMenuItem>
          <DropdownMenuItem
            className={triggerClass}
            onClick={e => handleDeleteData(item.id, e)}
          >
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  useEffect(() => {
    const container = containerRef.current
    const header = headerRef.current
    if (!container || !header) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        root: container,
        threshold: 1,
        rootMargin: '-1px 0px 0px 0px' // 精确触发边界
      }
    )

    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  // 个人信息 菜单下拉项
  const userInfoDropdownMenuItems = [
    { id: 'settings', text: '系统设置', icon: Settings },
    { id: 'delete', text: '删除所有对话', icon: Trash2 },
    { id: 'contact', text: '联系我们', icon: MessageCircle },
    { id: 'logout', text: '退出登录', icon: LogOut },
  ];
  // 处理菜单点击
  const handleMenuClick = (item: typeof userInfoDropdownMenuItems[0]) => {
    console.log('点击的菜单项:', item.text);
    switch(item.id) {
      case 'settings':
        setIsSettingsOpen(true);
        setActiveTab('general');
        console.log('setActiveTab后:', activeTab);
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        break;
      case 'contact':
        setIsContactOpen(true);
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };
  
  // 系统设置 弹窗面板
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [hovered, setHovered] = useState<string>("null");  // 鼠标悬停状态
  const userInfoSettingsOpenItems = [
    { id: 'general', text: '通用设置', 
      items: [
        { id:'language',text:'语言', Des:'下拉框, 语言, 列表',
          SelectItems:[
              { id: 'system', text: '跟随系统' },
              { id: 'zh', text: '中文' },
              { id: 'en', text: 'English' },
            ]
        },
        { id:'theme',text:'主题', Des:'下拉框, 主题, 列表',
          SelectItems:[
            { id: 'system', text: '跟随系统' },
            { id: 'light', text: '浅色' },
            { id: 'dark', text: '深色' },
          ]
        },
      ],
     },
    { id: 'account', text: '账户信息', 
      items: [
        { id:'userPhone',text:'手机号码', Des:'文本, 手机号码, 字符串',style: '文本',
          SelectItems:[
            { id: 'phone', text: '138****8293' },
          ]
        },

        { id:'userAgreement',text:'用户协议', Des:'按钮, 用户协议页面路由, 字符串',style: '按钮',
          SelectItems:[
            { id: 'src', text: 'https://www.baidu.com' },
          ]
        },
        { id:'privacyPolicy',text:'隐私政策', Des:'按钮, 隐私政策页面路由, 字符串',style: '按钮',
          SelectItems:[
            { id: 'src', text: 'https://hm.dh-data.com' },
          ]
        },
        { id:'cancelAccount',text:'注销账号', Des:'按钮, 注销账号, 字符串',style: '按钮',
          SelectItems:[
            { id: 'cancel', text: '注销' },
          ]},
      ],
     },
  ];
  

  // 删除对话 弹窗面板
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // 联系我们 弹窗面板
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 退出登录 弹窗面板
  // 退出登录处理函数
  const handleLogout = () => {
    try {
      // 清除所有 cookies
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      console.log(document.cookie,'>>>清除所有cookies')
      // 清除 localStorage
      localStorage.clear();
      // 选择性清除 
      // const keysToKeep = ['theme', 'language'];
      //   Object.keys(localStorage).forEach(key => {
      //     if (!keysToKeep.includes(key)) {
      //       localStorage.removeItem(key);
      //     }
      // }); 
      // 清除 sessionStorage
      sessionStorage.clear();
      // 跳转到登录页
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={clsx(
      "flex flex-col bg-[#f9fbff] transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
      >
         {/* 顶部标题和收起按钮 */}
          <div className="flex justify-between pt-[24px] pr-[14px] pb-[24px] pl-[20px] ">
              {!isCollapsed && <p>标题</p>}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-[var(--bg-color-hover)] rounded-full transition-colors"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
          </div>

          {/* 新对话按钮 */}
          <div className={clsx(
            "transition-all duration-300",
            isCollapsed ? "px-[10px]" : "pl-[20px]",
            "mb-[24px]"
          )}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={clsx( "flex items-center cursor-pointer",
                              isCollapsed ? "justify-center p-2" : chatBtnClass
                            )}
                          >
                            <img src={chatIcon} className={clsx("mr-[8px]", isCollapsed && "mr-0")} />
                            {!isCollapsed && "开启新对话"}
                        </div>
                    </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          <p>开启新对话</p>
                        </TooltipContent>
                      )}
                </Tooltip>
            </TooltipProvider>
          </div> {/* 新增对话框图标 结束div */}
          
          {/* 聊天列表 */}
          <div ref={containerRef}
              className={clsx(
                "overflow-y-auto",
                isCollapsed ? "px-[5px]" : "pl-[10px] pr-[8px]",
                "h-[calc(100vh-200px)]"
              )}
            >
               {/* 滚动内容 */}
               <div className="content-area">
                  {dataSource.map(data => (
                      <div key={data.day} className="pb-[10px] font-bold">
                        {!isCollapsed && (
                          <div  ref={el => {
                                  if (el) headersRef.current[data.day] = el
                                  else delete headersRef.current[data.day]
                                }} 
                                className={clsx(
                                  'sticky-header bg-[#f9fbff] text-[#555] text-[14px]  z-10 transition-all',
                                  activeHeader === data.day ? 'sticky top-0 shadow-md' // 使用sticky定位
                                    : 'relative'
                                )}
                            >
                              <div className="p-2">{data.day} 天</div>
                          </div>
                        )}

                        {data.children.map(item => (
                          <TooltipProvider key={item.id}>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div onClick={() => handleSelData(item)}
                                        className={clsx(
                                          "group",
                                          isCollapsed ? "h-[38px] w-[38px]" : "h-[38px]",
                                          "leading-[38px]"
                                        )}
                                      >
                                          {dropdownData.id === item.id ? (
                                                <Input
                                                  autoFocus
                                                  onBlur={handleBlur}
                                                  onChange={e => setEditingData(e.target.value)}
                                                  value={dropdownData.title}
                                                  className="rounded-[12px]"
                                                />
                                            ) : (
                                                  <div className={clsx(
                                                      dataItemClass,
                                                      item.id === selectedId && 'bg-[var(--bg-color-hover)]'
                                                    )}
                                                  >
                                                        {isCollapsed ? (
                                                                  <div className="flex justify-center items-center h-full">
                                                                    <MessageCircle size={20} />
                                                                  </div>
                                                          ) : (
                                                            <>
                                                                {item.title.length > 13 ? (
                                                                    <TooltipItem title={item.title} className="[&>div]:hover:bg-blue-100" />
                                                                  ) : (
                                                                    <div className="overflow-hidden h-[38px]">
                                                                      {item.title} ccc
                                                                    </div>
                                                                )}
                                                                <DropdownMenuComponent item={item} handleEditStart={handleEditStart} handleDeleteData={handleDeleteData} />
                                                            </>         
                                                        )}
                                                  </div>
                                            )}
                                      </div>
                                  </TooltipTrigger>
                                    {isCollapsed && (
                                        <TooltipContent side="right">
                                          <p>{item.title} 对话标题展示</p>
                                        </TooltipContent>
                                    )}
                              </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    ))}
                </div>  {/* 滚动内容  结束div */}
            
             </div> {/* 聊天列表 结束div */}

        {/*个人信息*/}
        <div className={clsx(
          'transition-all duration-300',
          isCollapsed ? 'mx-[5px]' : 'ml-[10px] mr-[10px]'
        )}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                      <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full " asChild>
                                <div className={clsx(
                                    'cursor-pointer p-[10px] outline-none rounded-[12px] hover:bg-[var(--bg-color-hover)] flex items-center',
                                    isCollapsed && 'justify-center'
                                )}>
                                      <div>
                                          <img src="https://picsum.photos/200"  className='w-[32px] h-[32px] rounded-full ' /> 
                                      </div>
                                      {/* <UserButton /> 如果使用Clerk的UserButton，也可以用自定义头像组件 */}
                                      {!isCollapsed && <span className="ml-2">个人信息</span>}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px] bg-white border-0">
                                  {userInfoDropdownMenuItems.map((item, index) => (
                                      <React.Fragment key={item.id}>
                                        <DropdownMenuItem 
                                          className={userInfoDropdownMenuClass}
                                          onClick={() => handleMenuClick(item)}
                                        >
                                          <item.icon size={16} />
                                          <span>{item.text}</span>
                                        </DropdownMenuItem>
                                        {/* 在退出登录前添加分隔线 */}
                                        {item.id === 'contact' && <DropdownMenuSeparator />}
                                      </React.Fragment>
                                  ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                      </div>  
                </TooltipTrigger>
                  {isCollapsed && (
                      <TooltipContent side="right">
                        <p>个人信息</p>
                      </TooltipContent>
                  )}
            </Tooltip>
          </TooltipProvider>
        </div>

      {/* 系统设置 弹窗面板  Dialog 组件*/}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogContent className="sm:max-w-[550px] bg-[#fff]">
        <DialogHeader>
            <DialogTitle>系统设置</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-12 grid grid-cols-2 bg-[#f5f5f5] rounded-lg flex items-center ">
                {userInfoSettingsOpenItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                      <TabsTrigger value={item.id}
                        onClick={() => {
                          // handlePopupClick(item); 
                          setActiveTab(item.id)
                        }}
                        style={{
                          backgroundColor: activeTab === item.id ? "white" : "transparent",
                          color: activeTab === item.id ? "black" : "grey",
                          borderRadius: "6",  // 圆角半径
                          outline: "none",  // 移除黑色边框
                          border: "none",    // 移除边框
                          width: "100%",
                          // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 添加阴影
                        }}
                      >
                          < span>{item.text}</span>
                      </TabsTrigger>
                    
                  </React.Fragment>
                ))}
            </TabsList>
          {/* 通用设置 */}
            <TabsContent value="general" className="mt-4" 
              style={{ border: "none", outline: "none", boxShadow: "none" }}
              >
              <div className="space-y-4 bg-while" >
                  {userInfoSettingsOpenItems[0].items.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <div className="h-14 flex items-center justify-between ">
                              <span>{item.text}</span>
                            {/* 下拉框 */}
                              <Select defaultValue="system" > 
                                {/* 默认展示选项 */}
                                  <SelectTrigger className="w-[180px]" 
                                    style={{backgroundColor:'#f5f5f5',color:'grey', border: "none", outline: "none" ,boxShadow: "none"}}
                                  >
                                      <SelectValue placeholder={item.SelectItems[0].id} />
                                  </SelectTrigger>
                                  {/* 下拉框内容 */}
                                  <SelectContent className="p-1 bg-white rounded-md shadow-lg "
                                    style={{backgroundColor:'#f5f5f5',color:'grey', border: "none", outline: "none" ,boxShadow: "none"}}
                                    >
                                        {item.SelectItems.map((selectItem) => (
                                            <SelectItem value={selectItem.id} className='hover:bg-[var(--bg-color-hover)]'>
                                              {selectItem.text}
                                            </SelectItem>
                                        ))}
                                  </SelectContent>
                              </Select>
                        </div>
                      </React.Fragment>
                    ))}
              </div>
            </TabsContent>
          {/* 账户信息 */}
            <TabsContent value="account" className="mt-4"
              style={{
                border: "none",    // 移除边框
                outline: "none",   // 移除轮廓
                boxShadow: "none" // 移除阴影
              }}>
                <div className="space-y-4">
                  {userInfoSettingsOpenItems[1].items.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <div className="flex items-center justify-between h-14">
                            <span>{item.text}</span>
                          {/* 根据 item.style 判断渲染内容 */}
                            {item.style === '按钮' ? (
                                  <button
                                    style={{
                                      border: "none",    // 移除边框
                                      outline: "none",   // 移除轮廓
                                      boxShadow: "none", // 移除阴影
                                      backgroundColor:
                                        item.id === 'cancelAccount' // 判断是否为注销账号按钮
                                          ? hovered === item.text
                                            ? '#E56363' // 注销账号按钮悬停时的背景色
                                            : '#ff4d4f' // 注销账号按钮默认背景色
                                          : hovered === item.text
                                          ? '#e4e4e7' // 其他按钮悬停时的背景色
                                          : 'white',  // 其他按钮默认背景色
                                      color:
                                        item.id === 'cancelAccount' // 判断是否为注销账号按钮
                                          ? 'white' // 注销账号按钮文字颜色
                                          : hovered === item.text
                                          ? 'black' // 其他按钮悬停时的文字颜色
                                          : 'grey', // 其他按钮默认文字颜色
                                      transition: 'background-color 0.3s ease', // 背景色过渡效果
                                      padding: '8px 16px', // 内边距
                                      borderRadius: '4px', // 圆角
                                      cursor: 'pointer',   // 鼠标悬停时显示手型
                                    }}
                                    onMouseEnter={() => setHovered(item.text)}
                                    onMouseLeave={() => setHovered('null')}
                                    onClick={() => {
                                      // 根据 item.id 处理不同的按钮点击逻辑
                                      switch (item.id) {
                                        case 'userAgreement':
                                          window.open(item.SelectItems[0].text, '_blank'); // 打开用户协议链接
                                          break;
                                        case 'privacyPolicy':
                                          window.open(item.SelectItems[0].text, '_blank'); // 打开隐私政策链接
                                          break;
                                        case 'cancelAccount':
                                          // 处理注销账号逻辑
                                          console.log('注销账号');
                                          break;
                                        default:
                                          break;
                                      }
                                    }}
                                  >
                                      {item.id === 'cancelAccount' ? '注销' : '查看'} {/* 注销账号按钮显示“注销”，其他按钮显示“查看” */}
                                  </button>
                            ) : (
                                  // 如果是文本类型，直接显示 SelectItems 的内容
                                  <span>{item.SelectItems[0].text}</span>
                            )}
                        </div>
                        {/* 添加分隔线（可选） */}
                          {index < userInfoSettingsOpenItems[1].items.length - 1 && (
                            <hr className="my-2 border-gray-200" />
                          )}
                      </React.Fragment>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

        {/* 删除对话 弹窗面板 */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[400px] bg-white p-6">
                    <DialogHeader>
                      <DialogTitle>删除所有历史对话</DialogTitle>
                    </DialogHeader>
                  {/* 提示文本 */}
                    <div className="text-center space-y-2 text-justify text-sm text-black-500">
                        <p>如点击确认删除，当前账号的所有历史对话将被清空，无法找回。</p>
                        <p>确认要删除所有历史对话吗？</p>
                    </div>

                  {/* 按钮组 */}
                    <div className="flex justify-end gap-4">
                        <button
                          style={{ 
                            border: "none",    // 移除边框
                            outline: "none",   // 移除轮廓
                            boxShadow: "none", // 移除阴影
                            backgroundColor: hovered==='取消' ? '#e4e4e7' : 'white', // 转换前后的背景颜色
                            color: hovered==='取消' ?'black':'black',
                            transition: 'backgroundColor 0.3s ease'
                          }}
                          onMouseEnter={() => setHovered('取消')}
                          onMouseLeave={() => setHovered('null')}
                          onClick={() => setIsDeleteDialogOpen(false)}
                        >
                          取消
                        </button>
                        <button
                          style={{ 
                            border: "none",    // 移除边框
                            outline: "none",   // 移除轮廓
                            boxShadow: "none", // 移除阴影
                            cursor: 'pointer',
                            backgroundColor: hovered==='确认删除' ? '#E56363' :'#ff4d4f',
                            color: hovered==='确认删除' ?'white':'white' ,
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={() => setHovered('确认删除')}
                          onMouseLeave={() => setHovered('null')}
                          onClick={() => {
                            // 处理删除逻辑
                            setIsDeleteDialogOpen(false);
                          }}
                        >
                          确认删除
                        </button>
                    </div>
                </DialogContent>
          </Dialog>

        {/* 联系我们 弹窗面板 */}
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogContent
                className="h-[80vh] fixed w-[20vw] rounded-lg border-l shadow-lg bg-gradient-to-b from-gray-200 to-white flex flex-col"
                style={{ marginRight: '0px' }}
              >
                {/* 头部 */}
                  <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-2">
                        <img src="https://picsum.photos/200" alt="logo" className="w-8 h-8" />
                        <span className="text-lg font-medium">F.U.T</span>
                      </div>
                  </div>

                {/* 主要内容区域（可滚动） */}
                  <div className="flex-1 overflow-y-auto p-4">
                      {/* 欢迎文本 */}
                        <div className="mb-4">
                            <h2 className="text-xl mb-1">您好 👋</h2>
                            <p className="text-lg">有什么可以帮您？</p>
                        </div>

                      {/* 选项列表 */}
                        <div className="space-y-2">
                            <button 
                              className="w-full text-left p-3 bg-transparent hover:bg-black rounded-lg flex items-center justify-between"
                              // style={{ backgroundColor:'transparent'}}
                            >
                              <span >查看 xxxxx 服务状态</span>
                              <svg
                                className="w-4 h-4 transform -rotate-45"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </button>
                            {/* 更多选项 */}
                        </div>

                      {/* 联系支持人员按钮 */}
                        <div className="mt-4">
                            <button className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-between">
                              <span>联系支持人员</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                        </div>
                  </div>

                {/* 底部导航（固定在底部） */}
                    <div className="border-t">
                      <div className="grid grid-cols-2 divide-x">
                            <button className="p-4 text-center hover:bg-gray-50 flex items-center justify-center gap-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                              </svg>
                              主页
                            </button>
                            <button className="p-4 text-center hover:bg-gray-50 flex items-center justify-center gap-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                              </svg>
                              消息
                            </button>
                      </div>
                    </div>
              </DialogContent>
          </Dialog>
    </div> // 结束div
  )
}

export default SidebarComponent
