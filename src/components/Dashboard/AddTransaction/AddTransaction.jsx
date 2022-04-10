import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from "../../Button";
import { ButtonsWrap } from "../../ButtonsWrap";
import { Input } from "../../Input";
import { Toggle } from "./Toggle";
import { Select } from "./Select";
import iconDate from '../../../images/icons/date.svg'
import iconSelect from '../../../images/icons/select.svg'
import { addTransaction } from '../../../redux/operations/financeOperations'
import { api } from "../../../api/api";
import { DropDown } from "../../DropDown";

const SchemaYup = Yup.object({
  // selected: Yup.number('Выберите категорию').required('Выберите категорию'),
  amount: Yup.number('Введите сумму').required('Введите сумму'),
  comment: Yup.string('Коментарий')
    .max(10, 'Ваш комментарий слишком велик')
});

const Calendar = styled(Input)`
`

const InputWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectorIcon = styled.img`
position: absolute;
pointer-events: none;
top: 196px;
left: 422px;
z-index: 0;
cursor: pointer;
`;

const DateIcon = styled.img`
pointer-events: none;
position: absolute;
top: 260px;
left: 412px;
background-color: #fff;
cursor: pointer;
`;

const defaultValueSelected = "Выберите категорию";
const optionsIncome = [];
const optionsExpense = [];

let localDate = new Date().toISOString().split('T')[0];

export const AddTransaction = ({modalIsOpen, closeModal}) => {
    const [amount, setAmount] = useState();
    const [comment, setComment] = useState("");
    const [date, setDate] = useState(localDate);
    const [selected, setSelected] = useState(defaultValueSelected);
    const [toggle, setToggle] = useState(true);
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const onChangeToggle = () => {
      setToggle(!toggle);
      setSelected(defaultValueSelected);
    };
    const onChangeSelected = (event) => setSelected(event.target.value)
    
    const onSubmit = event => {
      event.preventDefault();
      console.log(newTransaction);
      dispatch(addTransaction(newTransaction));
      closeModal();
    };

    const newTransaction = {
      "isExpense": toggle,
      "category": selected,
      "amount": Number.parseFloat(amount),
      comment,
    }

    useEffect(() => {
      const getCategories = async () => {
        const data = await api.categories.getCategories()
        console.log("add", data);
        setCategories([...data]);
      };
      if (categories.length===0) getCategories();

    }, [modalIsOpen]);

    useEffect(() => {
      if (categories.length!==0)
      for (let i=0; i<categories.length; i+=1)
        {
          (categories[i].isExpense)
          ? optionsExpense.push(categories[i]) 
          : optionsIncome.push(categories[i])
        }
    }, [categories]);


    return (
        <>
        <Toggle active={toggle} onChange={onChangeToggle} />
        <Select 
          defaultValue={defaultValueSelected}
          options={toggle ? optionsExpense : optionsIncome} 
          categories={categories} 
          onChange={onChangeSelected} 
          required
        /> 
        <SelectorIcon src={iconSelect}/>
        {/* <DropDown
          options={toggle ? optionsExpense : optionsIncome} 
          selectedOption={selected}
          setSelectedOption={setSelected}
          placeholder="Выберите категорию"
          underline
        /> */}
        
        <form onSubmit={onSubmit}>
        <InputWrap>
          <Input
          placeholder="0.00"
          w="181px"
          mb="40px"
          type="number"
          name="amount"
          value={amount}
          setValue={setAmount}
          required
          />

          <Calendar
          w="181px"
          mb="40px"
          type="date"
          name="date"
          value={date}
          setValue={setDate}
          required
          /> 
          <DateIcon src={iconDate}/>

        </InputWrap>
        <Input
          placeholder="Комментарий"
          mb="40px"
          type="text"
          name="comment"
          value={comment}
          setValue={setComment}
        />
        <ButtonsWrap>
          <Button
            type="submit"
            accent
            w="100%"
            mw="300px"
            h="50px"
            m="0 0 20px 0"
            p="0"
          >
            ДОБАВИТЬ
          </Button>
          <Button
            w="100%"
            mw="300px"
            h="50px"
            onClick={closeModal}
          >
            ОТМЕНА
          </Button>
        </ButtonsWrap>        
        </form>
      </>
    )
}
