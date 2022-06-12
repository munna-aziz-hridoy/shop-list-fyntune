import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;
const ShopForm = ({ refetch, areas, categories }) => {
  const handleAddShop = (value) => {
    const { date, ...rest } = value;

    const openingDate = date[0]._d.getTime();
    const closingDate = date[1]._d.getTime();

    const dateRange = [openingDate, closingDate];
    const shopData = { ...rest, dateRange };

    fetch("http://localhost:5000/addShop", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(shopData),
    })
      .then((res) => res.json())
      .then(() => refetch());
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-500 capitalize">add shop</h1>
      <>
        {" "}
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={handleAddShop}
        >
          <Form.Item
            label="Shop Name"
            name="shopName"
            rules={[
              {
                required: true,
                message: "Please enter shop name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "Please Select an area" }]}
          >
            <Select>
              {areas.map((area, index) => (
                <Select.Option key={index} value={area} className="capitalize">
                  {area}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
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

          <Form.Item
            label="Opening Date"
            name="date"
            rules={[{ required: true, message: "What is your opening time?" }]}
          >
            <RangePicker />
          </Form.Item>

          <div className="w-full flex justify-center items-center">
            <Button htmlType="submit" type="primary">
              Add Shop
            </Button>
          </div>
        </Form>
      </>
    </div>
  );
};

export default ShopForm;
