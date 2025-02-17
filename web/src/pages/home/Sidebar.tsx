import React, { useEffect, useState, useRef } from 'react'
import { Ellipsis } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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
  'flex items-center pl-[10px] pr-[10px] h-[44px] w-[130px] rounded-[14px] text-[16px] text-[#4d6bfe] bg-[rgba(219,234,254)] '
const SidebarComponent = () => {
  const navigate = useNavigate()
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
      title: '标题'
    },
    {
      id: 2,
      title: '标题标题标题标题标题标题标题'
    },
    {
      id: 3,
      title: '标题'
    },
    {
      id: 4,
      title: '标题'
    },
    {
      id: 5,
      title: '标题'
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

  return (
    <div className="flex flex-col w-[260px] bg-[#f9fbff]">
      <div className="flex justify-between pt-[24px] pr-[14px] pb-[24px] pl-[20px] ">
        <p>标题</p>
        <p>图标</p>
      </div>
      <div className="pl-[20px] mb-[24px]">
        <div className={chatBtnClass}>开启新对话</div>
      </div>
      <div className="pl-[10px] pr-[14px] h-[calc(100vh-200px)] ">
        {dataSource.map(item => (
          <div
            key={item.id}
            onClick={() => handleSelData(item)}
            className="group h-[38px] leading-[38px] "
          >
            {dropdownData.id == item.id ? (
              <Input
                autoFocus
                onBlur={handleBlur}
                onChange={e => setEditingData(e.target.value)}
                value={dropdownData.title}
                className="rounded-[12px] b"
              />
            ) : (
              // 路由跳转
              <div
                className={
                  item.id == selectedId
                    ? `${dataItemClass} bg-[var(--bg-color-hover)]`
                    : dataItemClass
                }
              >
                {item.title.length > 13 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className="[&>div]:hover:bg-blue-100"
                        asChild
                      >
                        {/* 保留原有div结构，添加样式继承 */}
                        <div className="overflow-hidden h-[38px] your-existing-classes">
                          {item.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black  shadow-lg border-0">
                        {/* 颜色为白色,最大字节30 */}
                        <div className="text-white text-[14px] max-w-[200px] overflow-hidden">
                          {item.title}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="overflow-hidden h-[38px]">{item.title}</div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="absolute top-[15%] right-[10px]"
                    asChild
                  >
                    <Ellipsis
                      className={
                        item.id == selectedId
                          ? ellipsisClass
                          : `${ellipsisClass} group-hover:opacity-100 opacity-0 `
                      }
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#fff] border-0">
                    <DropdownMenuItem
                      className={`${triggerClass}`}
                      onClick={handleEditStart.bind(null, item)}
                    >
                      重命名
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${triggerClass}`}
                      onClick={() => {
                        handleDeleteData(item.id)
                      }}
                    >
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
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
