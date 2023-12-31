import React, { useEffect, useState } from 'react'
import todostyl from './todo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addtask, removetask, markcompleted, resettask } from './Counterslice';

function Todo() {
  const [userinput, setuserinput] = useState({ task: "", status: false })
  // const [todolist, setTodolist] = useState([]);
  const [countcomp, setCountcomp] = useState(0)
  const todolist = useSelector(state => state.todo)
  const dispatch = useDispatch();

  console.log(todolist)

  function handleinput(event) {
    const name = event.target.name;
    const value = event.target.value;
    setuserinput({ ...userinput, [name]: value });


  }
  useEffect(() => {
    setuserinput({ task: "", status: false })
  }, [todolist])





  // function markcompleted(index) {
  //   const updatedlist = todolist.map((item, id) => {
  //     if (id == index) {
  //       item.status = true
  //     }
  //     return item
  //   })
  //   setTodolist(updatedlist)
  // }


  useEffect(() => {
    if (todolist.length == 0) {
      setCountcomp(0)
    }
    else {
      setCountcomp(0)
      todolist.map(item => {
        if (item.status == true) {
          setCountcomp((prev) => {
            return prev + 1
          })
        }
      })
    }
  }, [todolist])


  return (
    <div className={todostyl.container}>

      <div className={todostyl.newtask}>
        <h1>Make Todo's</h1>
        <div className={todostyl.status}>
          <div><img src="./total.png" alt="" title='Total Todo' /> <p>{todolist.length}</p></div>
          <div><img src="./pending.png" alt="" title='Pending Todo' /> <p>{todolist.length - countcomp}</p></div>
          <div><img src="./completed.png" alt="" title='Completed Todo' /> <p>{countcomp}</p></div>

        </div>
        <div className={todostyl.inputuser}>
          <div className={todostyl.inputfield}><input type='text' value={userinput.task} name='task' onChange={handleinput} placeholder='Add New Todo....' /></div>
          <button className={todostyl.todobtn} type='button' onClick={() => dispatch(addtask(userinput))} > <img src="./add.png" alt="" /></button>
          <button className={todostyl.todobtn} type='button' onClick={() => dispatch(resettask())}><img src="./reset.png" alt="" /></button>
        </div>


      </div>

      {todolist.length == 0 ? (
        <div className={todostyl.emptydiv}>
          <img id={todostyl.empty} src="./empty.png" alt="empty" /></div>


      ) : (

        <div className={todostyl.showtask}>
          {
            todolist.map((item, index) => {
              return (
                <div className={todostyl.mapdiv}>
                  <div id={todostyl.para}>

                    <p>{item.task}</p>
                  </div>
                  <div id={todostyl.listbutton}>
                    {item.status === false ? <p id={todostyl.pending}>pending</p> : <p id={todostyl.completed}>completed</p>}
                    <button className={todostyl.todobtn} key={index} onClick={() => dispatch(markcompleted(index))}><img src='./completed.png' /></button>
                    <button className={todostyl.todobtn} key={index} onClick={() => dispatch(removetask(index))}><img src='./remove.png' /></button>
                  </div>
                </div>
              )
            })

          }

        </div>
      )}
    </div>


  )
}

export default Todo
