import React, { useEffect, useState, useRef } from 'react'
import { Ellipsis } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useLocation, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx' // 引入 clsx 来简化动态样式绑定
import { Button } from '@/components/ui/button'
import chatIcon from '@/assets/images/chat.svg'
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

//   样式
const triggerClass = 'cursor-pointer hover:bg-[#ccc] rounded-[12px]'
const dataItemClass =
  'relative pl-[10px] pr-[10px] hover:bg-[var(--bg-color-hover)] rounded-[12px] cursor-pointer'
const ellipsisClass =
  'cursor-pointer text-[12px]  rounded-[50%] pl-[2px] pr-[2px]  bg-[var(--bg-color-hover)] hover:bg-[#fff]'
const chatBtnClass =
  'flex items-center pl-[10px] pr-[10px] h-[44px] w-[130px] rounded-[14px] text-[16px] text-[#4d6bfe] bg-[rgba(219,234,254)] hover:bg-[#c6dcf8]  cursor-pointer'

const SidebarComponent = () => {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeHeader, setActiveHeader] = useState<number | null>(null)
  const headersRef = useRef<{ [key: number]: HTMLElement }>({})
  const [isSticky, setIsSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     // 替换为你的 API 端点
  //     fetch('https://api.example.com/sidebar-data')
  //       .then(response => response.json())
  //       .then(data => setData(data))
  //       .catch(error => console.error('Error fetching data:', error));
  //   }, []);
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
    },
    {
      id: 31,
      title: '标题标题标题标题标题标题标题',
      day: 14,
      children: [
        {
          id: 321,
          title: '标题'
        },
        {
          id: 322,
          title: '标题'
        },
        {
          id: 323,
          title: '标题'
        },
        {
          id: 324,
          title: '标题'
        },
        {
          id: 325,
          title: '标题'
        }
      ]
    },
    {
      id: 431,
      title: '标题标题标题标题标题标题标题',
      day: 24,
      children: [
        {
          id: 4321,
          title: '标题'
        },
        {
          id: 4322,
          title: '标题'
        },
        {
          id: 4323,
          title: '标题'
        },
        {
          id: 4324,
          title: '标题'
        },
        {
          id: 4325,
          title: '标题'
        },
        {
          id: 4321,
          title: '标题'
        },
        {
          id: 5322,
          title: '标题'
        },
        {
          id: 45323,
          title: '标题'
        },
        {
          id: 45324,
          title: '标题'
        },
        {
          id: 45325,
          title: '标题'
        },
        {
          id: 45324,
          title: '标题'
        },
        {
          id: 48325,
          title: '标题'
        },
        {
          id: 48325,
          title: '标题'
        },
        {
          id: 48325,
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
    console.log(item, 2)
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
            onClick={() => handleEditStart(item)}
          >
            重命名
          </DropdownMenuItem>
          <DropdownMenuItem
            className={triggerClass}
            onClick={() => handleDeleteData(item.id)}
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

  return (
    <div className="flex flex-col w-[260px] bg-[#f9fbff]">
      <div className="flex justify-between pt-[24px] pr-[14px] pb-[24px] pl-[20px] ">
        <p>标题</p>
        <p>图标</p>
      </div>
      <div className="pl-[20px] mb-[24px]">
        <div className={chatBtnClass}>
          {/* 引入图片 */}
          <img src={chatIcon} className="mr-[8px]" />
          开启新对话
        </div>
      </div>
      <div
        ref={containerRef}
        className="pl-[10px] pr-[8px] h-[calc(100vh-200px)] overflow-y-auto"
      >
        {/* 滚动内容 */}
        <div className="content-area">
          {dataSource.map(data => (
            <div key={data.day} className="pb-[10px] font-bold">
              <div
                ref={el => {
                  if (el) headersRef.current[data.day] = el
                  else delete headersRef.current[data.day]
                }}
                className={clsx(
                  'sticky-header bg-[#f9fbff] text-[#555] text-[14px]  z-10 transition-all',
                  activeHeader === data.day
                    ? 'sticky top-0 shadow-md' // 使用sticky定位
                    : 'relative'
                )}
              >
                <div className="p-2">
                  {data.day} 天
                  {
                    activeHeader === data.day
                    //  && (
                    //   // <span className="ml-2 text-sm text-gray-500">
                    //   //   （吸顶中）
                    //   // </span>
                    // )
                  }
                </div>
              </div>

              {data.children.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelData(item)}
                  className="group h-[38px] leading-[38px]"
                >
                  {dropdownData.id === item.id ? (
                    <Input
                      autoFocus
                      onBlur={handleBlur}
                      onChange={e => setEditingData(e.target.value)}
                      value={dropdownData.title}
                      className="rounded-[12px] b"
                    />
                  ) : (
                    <div
                      className={clsx(
                        dataItemClass,
                        item.id === selectedId && 'bg-[var(--bg-color-hover)]'
                      )}
                    >
                      {item.title.length > 13 ? (
                        <TooltipItem
                          title={item.title}
                          className="[&>div]:hover:bg-blue-100"
                        />
                      ) : (
                        <div className="overflow-hidden h-[38px]">
                          {item.title}
                        </div>
                      )}
                      <DropdownMenuComponent
                        item={item}
                        handleEditStart={handleEditStart}
                        handleDeleteData={handleDeleteData}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[10px] mr-[10px]">
        <div className=" cursor-pointer p-[10px] rounded-[12px] hover:bg-[var(--bg-color-hover)]">
          用户图标
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent
