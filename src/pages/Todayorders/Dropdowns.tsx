import React, { useState, useContext, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
import icon2 from "../../images/icon-call.svg";
import GlobalContext from "../../store/global-context";
import { removeFilter } from "../../redux_toolkit/reducer/todaysOrderModalsReducer";
import { useDispatch, useSelector } from "react-redux";

interface options {
  label: string;
  value: string | number;
}

export const Branches = (props: any) => {
  const globalGtx = useContext(GlobalContext);
  const branchesoptions: options[] = props.branchesData.map((item: any) => {
    return { value: item.id, label: item.branch_english };
  });

  const dispatch = useDispatch();
  const branchStatus = useSelector((state: any) => state.todaysOrderModalsReducer.branchStatus);
  const [valueSelected, setValueSelected] = useState([]);
  const [condition, setCondition] = useState(true);

  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected: options[], options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} />{" "}
        {selected.length === 0
          ? "All Branches"
          : selected.map((item: any) => item.label).join(", ")}
      </>
    );
  };

  useEffect(()=>{
    if(branchStatus===true){
      setSelected([])
      setCondition(branchStatus)
    }else{
      setCondition(branchStatus)
    }
  },[branchStatus])

  useEffect(() => {
    props.selectbranches(
      selected?.map((item: options) => item.value).join(",")
    );
  }, [selected]);

  return (
    <div className={`${st.selectDropdown}`}>
      <MultiSelect
        options={branchesoptions}
        defaultIsOpen={true}
        valueRenderer={customValueRenderer}
        value={condition===true ? valueSelected : selected}
        onChange={(e:any)=>{setSelected(e);
          dispatch(removeFilter())
          }}
        labelledBy={"All Branches"}
        isCreatable={true}
        closeOnChangedValue={true}
      />
    </div>
  );
};

export const Agents = (props: any) => {
  const globalGtx = useContext(GlobalContext);
  const agentsoptions: options[] = props.agentsData.map((item: any) => {
    return { value: item.id, label: item.name };
  });

  const dispatch = useDispatch();
  const branchStatus = useSelector((state: any) => state.todaysOrderModalsReducer.branchStatus);
  const [valueSelected, setValueSelected] = useState([]);
  const [condition, setCondition] = useState(true);
  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected: options[], options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} />{" "}
        {selected.length === 0
          ? "All Agents"
          : selected.map((item: any) => item.label).join(", ")}
      </>
    );
  };

  useEffect(()=>{
    if(branchStatus==true){
      setSelected([])
    }else{
      setCondition(branchStatus)
    }
  },[branchStatus])

  useEffect(() => {
    props.selectagents(selected?.map((item: options) => item.value).join(","));
  }, [selected]);

  return (
    <div className={`${st.selectDropdown}`}>
      <MultiSelect
        options={agentsoptions}
        defaultIsOpen={true}
        valueRenderer={customValueRenderer}
        value={condition===true ? valueSelected : selected}
        onChange={(e:any)=>{setSelected(e);
          dispatch(removeFilter())
          }}
        labelledBy={"All Branches"}
        isCreatable={true}
        closeOnChangedValue={true}
      />
    </div>
  );
};
