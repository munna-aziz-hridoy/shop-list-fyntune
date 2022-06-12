import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setShop } from "../../redux/actions/shopActions";

const ShopTable = ({ data, refetch }) => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state);

  useEffect(() => {
    dispatch(setShop(data));
  }, [dispatch, data]);

  const handleDeleteShop = (id) => {
    fetch(`http://localhost:5000/deleteShop?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => refetch());
  };

  const shopsData = shop?.allShops?.shops;

  //   get all shop and looking for open and closing status based on todays date
  const today = new Date().getTime();
  const allShops = shopsData?.map((shop) => {
    const { _id, shopName, category, area, dateRange } = shop;

    let open;

    const openingDate = dateRange[0];
    const closingDate = dateRange[1];

    if (openingDate <= today && closingDate >= today) {
      open = "open";
    } else {
      open = "close";
    }

    return {
      name: shopName,
      category,
      area,
      open,
      id: (
        <Button type="danger" onClick={() => handleDeleteShop(_id)}>
          Delete
        </Button>
      ),
    };
  });
  console.log(allShops);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
    },
  ];

  return <Table dataSource={allShops} columns={columns} />;
};

export default ShopTable;
