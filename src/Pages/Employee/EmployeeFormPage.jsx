import { useEffect, useState, useRef } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function EmployeeFormPage() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const pincodeRef = useRef(null);

  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const emp = urlParams.get("emp");
  console.log('employeee >>', emp);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  function select(product) {
    setSelectedProduct(product)
    console.log(selectedProduct);
  }

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/service/category/');
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  useEffect(() => {
    fetchCategory()
  }, []);

  const fetchProducts = async (cat_id) => {
    try {
      const response = await axios.get('http://localhost:8000/service/product/listing/'+cat_id+'/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const handleCategoryChange = (event) => {
    setSelectedCategory(event)
    fetchProducts(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const first_name = firstNameRef.current.value;
    const last_name = lastNameRef.current.value;
    const phone = phoneRef.current.value;
    const pincode = pincodeRef.current.value;

    const backend_data1 = {
      first_name,
      last_name,
      phone
    }

    try {
      const response = await axios.patch(`http://localhost:8000/emp/update-profile/${emp}/`, backend_data1);
      // setProducts(response.data);
    } catch (error) {
      console.error('Update 1 error:', error);
    }

    const array_of_ids = selectedProduct.map((product)=>{
      return product['id']
    })


    const backend_data2 = {
       pincode,
      'category':selectedCategory,
      'product':array_of_ids
    }

    try {
      const response = await axios.patch(`http://localhost:8000/emp/complete-profile/${emp}/`, backend_data2);
      // setProducts(response.data);
      navigate('/employee/login');
      // location.reload()
      toast.success('Your request got submited');
    } catch (error) {
      console.error('Update 2 error:', error);
    }
    // console.log(backend_data1);
    console.log(backend_data2);
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <Card color="transparent" shadow={false}>

        <Typography variant="h4" color="blue-gray">
          Profile completion
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">

          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="first_name" inputRef={firstNameRef} />
            <Input size="lg" label="last_name" inputRef={lastNameRef} />
            <Input size="lg" label="phone" inputRef={phoneRef} />
            <Input size="lg" label="pincode" inputRef={pincodeRef} />

            <div className="w-full">
              <Select label="Select Category" onChange={handleCategoryChange}>
                {category.map((cat_item) => (
                  <Option key={cat_item.id} value={`${cat_item.id}`}>{cat_item.category_name}</Option>
                ))}
              </Select>
            </div>

            <div className="w-full">
              <Multiselect
                options={products}
                onRemove={select}
                onSelect={select}

                displayValue="product_name"
              >
              </Multiselect>
            </div>
          </div>

          <Button onClick={handleSubmit} className="mt-6" fullWidth>
            Register
          </Button>

        </form>

      </Card>
    </div>
  );
}

export default EmployeeFormPage;