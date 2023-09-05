import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from "./ExpenseList.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../store/expense';
import axios from 'axios';


const ExpenseList = () => {
  const expense = useSelector((state) => state.expenseStore);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let total = 0;
  total = expense.items.reduce((acc,item) => {
    return acc + Number(item.amount)
  },0)

  const editClickHandler = (item) => {
    const filter = expense.items.filter((ele) => ele !== item);
    // expense.editItem(item, filter);
    dispatch(expenseActions.editItem({ item: item, filtered: filter }));
  }

  const dltClickHandler = async (item) => {
    dispatch(expenseActions.removeItem(item));

    const email = auth.userEmail.replace(/[.@]/g,"");
    try {
      const res = await axios.get(`https://expense-project-practice-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      const Id = Object.keys(data).find((eleId) => data[eleId].id === item.id);
      try {
        const res = await axios.delete(`https://expense-project-practice-default-rtdb.firebaseio.com/${email}/expenses/${Id}.json`)
      } catch (error) {
        alert(error)
      }
    } catch (error) {
      alert(error)
    }
  }

  const restoreData = async () => {
    const email = auth.userEmail.replace(/[.@]/g,"");
    try {
      const res = await axios.get(`https://expense-project-practice-default-rtdb.firebaseio.com/${email}/expenses.json`)

      const data = res.data;
      if(data){
        const realData = Object.values(data).reverse();
        console.log(realData);
        dispatch(expenseActions.setItems(realData))
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if(auth.userEmail !== null){
      restoreData();
    }
  },[auth.userEmail])

  return (
    <section className={classes.listCon}>
      {/* <div className={classes.container}> */}
        <h1>Expenses</h1>
        <div className={classes.totalAmt}>
          <h3>Total expense  <span> ₹{total}</span></h3>
        </div>  
          {/* {total >= 10000 &&
            (!auth.isPremium ? (
              <Button variant="danger" onClick={clickActPremiumHandler}>
                Activate Premium
              </Button>
            ) : (
              <Button variant="warning" onClick={clickDownloadHandler}><FaCrown />Download List</Button>
            ))} */}

        {/* </div>
        {total >= 10000 && (!auth.isPremium &&
          <p style={{ color: "red" }}>
            *Please Activate Premium total expenses more than 10000
          </p>
        )}
      </div> */}
      <ul>
        {expense.items.map((i, index) => (
          <li className={classes.listItem} key={index}>
            <div className={classes.date}>{i.date}</div>
            <h3 className={classes.category}>{i.category.toUpperCase()}</h3>
            <div className={classes.des}>{i.description}</div>
            <div className={classes.Amt}>₹{i.amount}</div>
            <div className={classes.btn}>
              <button
                className={classes.edit}
                onClick={() => editClickHandler(i)}
              >
                <AiFillEdit />
              </button>
              <button
                className={classes.dlt}
                onClick={() => dltClickHandler(i)}
              >
                <AiFillDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList
