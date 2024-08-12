import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts , addProductToApi } from '../redux/productSlice';
import { updateUser } from '../redux/slices/adminslice';
import { Button } from 'react-bootstrap';
import '../style/cardstyle.css';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { products = [], status, users = [] } = useSelector(state => state.admin);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [errorExist, setError] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate=useNavigate();

  const handleAddProduct = () => {
    if (productName && productPrice && productDescription) {
      try {
        const newProduct = {
          name: productName,
          price: parseFloat(productPrice),
          description: productDescription
        };
        console.log('Submitting new product:', newProduct); 
        dispatch(addProductToApi(newProduct));
        setProductName('');
        setProductPrice('');
        setProductDescription('');
      } catch (error) {
        console.error('Failed to add product:', error);
      }
    }
  };

  // const handleUpdateProduct = async () => {
  //   if (productId && productName && productPrice && productDescription && productImage) {
  //     try {
  //       const updatedProduct = {
  //         name: productName,
  //         price: parseFloat(productPrice),
  //         description: productDescription,
  //         image: productImage,
  //       };
  //       const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProduct);
  //       dispatch(updateProduct(response.data));
  //       setProductId('');
  //       setProductName('');
  //       setProductPrice('');
  //       setProductDescription('');
  //       setProductImage('');
  //     } catch (error) {
  //       console.error('Failed to update product:', error);
  //     }
  //   }
  // };

  const handleUpdateUser = () => {
    if (!userId || !userName || !userEmail) {
      setError('All fields are required.');
      return;
    }
    else{
      dispatch(updateUser({ id: userId, name: userName, email: userEmail }));
    }
    setError('');
    setUserId('');
    setUserName('');
    setUserEmail('');
  };

  return (
    <div className='container-fluid bg-info' id='container'>
      <h2 className='text-warning text-center'>Admin Panel</h2>
      <div>
        <h3 className='text-info bg-warning text-center'>Products</h3>
        <div>
        <input
            id="Productname"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
          id="Productprice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
          />
          <input
            id="Productdescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
          />
          <Button className='ms-2' onClick={handleAddProduct}>Add Product
          </Button><br/>
          {/* <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID to update"
          />
          <Button className='ms-2' onClick={handleUpdateProduct} disabled={status === 'loading'}>
            {status === 'loading' ? <Spinner animation="border" size="sm" /> : 'Update Product'}
          </Button>
          {error && <p className='text-danger'>{error}</p>} */}
        </div>
      </div>
      <div>
      <div className="mb-4">
      <h3 className='text-info bg-warning text-center mt-3'>Update User</h3>
      {errorExist && <div className="alert alert-danger">{errorExist}</div>}
      <div className="mb-3">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Enter user ID'
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Enter user name'
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userEmail">User Email</label>
        <input
          id="userEmail"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder='Enter user email'
          className="form-control"
          required
        />
      </div>
      <button className='btn btn-warning mt-2' onClick={handleUpdateUser}>
        Update User
      </button>
    </div>
      </div>
      <div>
        <h3 className='bg-warning text-info text-center mt-2'>Users</h3>
        <ol>
          {(users || []).map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AdminPanel;
