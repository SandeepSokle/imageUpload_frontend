import { useDispatch, useSelector } from "react-redux";
import HomeHelper from "./HomeHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { getData } from "../redux/home/action";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allData = useSelector((state) => {
    return state.home.allData;
  });
  const user = useSelector((state) => {
    return state?.user?.user;
  });
  const getAllData = async () => {
    let data = await axios.get(`${process.env.React_App_Api}/images`);
    dispatch(getData(data.data));
    return data.data.product;
  };
  useEffect(() => {
    if (!user) navigate("/login");
    getAllData();
  }, []);

  return (
    <>
      <Header />

      <div
        className="homeContainer"
        style={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: "20px",
          rowGap: "20px",
        }}
      >
        {allData?.images?.map((ele, i) => {
          return <HomeHelper data={ele} idx={i} />;
        })}
      </div>
    </>
  );
};

export default Home;
