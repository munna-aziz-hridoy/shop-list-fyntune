import React, { useState } from "react";
import ShopForm from "../ShopForm/ShopForm";
import ShopTable from "../ShopTable/ShopTable";
import { useQuery } from "react-query";
import { Form, Select, Button } from "antd";
import Spinner from "../Spinner";

const areas = [
  "thane",
  "pune",
  "mumbai suburban",
  "nashik",
  "nagpur",
  "ahmednagar",
  "solapur",
];
const categories = [
  "grocery",
  "butcher",
  "baker",
  "chemist",
  "stationery shop",
];

const Home = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["shops", selectedArea, selectedCategory],
    () => {
      return fetch(
        `https://hidden-forest-48220.herokuapp.com/getShop?area=${
          selectedArea || "undefined"
        }&category=${selectedCategory || "undefined"}`
      ).then((res) => res.json());
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  const handleFilter = (values) => {
    setSelectedArea(values.area);
    setSelectedCategory(values.category);
  };

  return (
    <div className="container mx-auto my-16 p-3">
      <div className="w-full flex flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-[40%]">
          <ShopForm refetch={refetch} categories={categories} areas={areas} />
        </div>
        <div className="w-full md:w-[60%]">
          <div className="flex flex-col md:flex-row justify-start items-start my-8 gap-3 md:gap-24">
            <h2 className="text-2xl font-bold text-gray-500 capitalize text-left w-[35%]">
              filter by:
            </h2>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={handleFilter}
              style={{ width: "100%" }}
            >
              <Form.Item label="Area" name="area">
                <Select>
                  {areas.map((area, index) => (
                    <Select.Option
                      key={index}
                      value={area}
                      className="capitalize"
                    >
                      {area}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select>
                  {categories.map((category, index) => (
                    <Select.Option
                      key={index}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="w-full flex justify-center items-center">
                <Button htmlType="submit" type="primary">
                  Filter
                </Button>
              </div>
            </Form>
          </div>

          <ShopTable data={data} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Home;
