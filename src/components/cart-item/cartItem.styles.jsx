import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;

  img {
    width: 30%;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 30px;
`;

export const CartItemName = styled.span`
  font-size: 16px;
`;

export const CartItemPrice = styled.span`
  padding: 0 10px;
`;

export const IconContainer = styled.span`
  display: flex;
`;

export const Subtract = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: rgb(35, 245, 241);
  }
`;

export const Add = styled.div`
  padding: 8px 0px 8px 0px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: rgb(35, 245, 241);
  }
`;

export const Remove = styled.div`
  padding: 8px 5px;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    color: rgb(35, 245, 241);
  }
`;

//Before with SASS

// .cart-item-container {
//     width: 100%;
//     display: flex;
//     height: 80px;
//     margin-bottom: 15px;
  
//     img {
//       width: 30%;
//     }
  
//     .item-details {
//       width: 70%;
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       justify-content: center;
//       padding: 10px 30px;

//       .name {
//         font-size: 16px;
//       }
//       .price {
//         padding: 0 10px;
//       };

//       .icon-container {
//         display: flex;

//         .subtract, .add, .remove {
//           cursor: pointer;
//         }

//         .add, .subtract {
//           font-size: 20px;
//         }

//         .subtract {
//           padding: 10px 10px;
//         }

//         .add {
//           padding: 8px 0px 8px 0px;
//         }

//         .remove {
//           padding: 8px 5px;
//           font-size: 10px;
//         }

//         .add:hover,
//         .remove:hover,
//         .subtract:hover {
//           color: rgb(35, 245, 241);
//         }
//       }
//     };
//   };
  