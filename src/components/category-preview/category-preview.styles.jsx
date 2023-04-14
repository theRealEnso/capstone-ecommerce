import styled from 'styled-components'

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .title {
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
    &:hover {
      color: rgb(35, 245, 241);
    }
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;

export const ViewMore = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 30px 50px 0 0;
  &:hover {
      color: rgb(35, 245, 241);
    }

  .sub-title {
    &:hover {
      color: rgb(35, 245, 241);
    }
  }
`;

//Before with SASS


// .category-preview-container {
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 30px;
  
//     .title {
//       font-size: 28px;
//       margin-bottom: 25px;
//       cursor: pointer;
//     }

//     .title:hover, .sub-title:hover {
//       color: rgb(35, 245, 241);
//     }
  
//     .preview {
//       display: grid;
//       grid-template-columns: repeat(4, 1fr);
//       column-gap: 20px;
//     }

//     .view-more {
//       display: flex;
//       justify-content: flex-end;
//       margin: 30px 50px 0 0;
//     }

//     .view-more:hover {
//       color: rgb(35, 245, 241);
//     }
//   }
  