import styled from 'styled-components';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
  &:hover {
    color: rgb(35, 245, 241);
  }
`;

//Before with SASS

// .cart-icon-container {
//     width: 45px;
//     height: 45px;
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
  
//     .shopping-icon {
//       width: 24px;
//       height: 24px;
//     }
  
//     .item-count {
//       position: absolute;
//       font-size: 10px;
//       font-weight: bold;
//       bottom: 12px;
//     }

//     .item-count:hover {
//       color: rgb(35, 245, 241);
//     }
//   }
  