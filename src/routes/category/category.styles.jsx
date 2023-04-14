import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 38px;
    margin-bottom: 50px;
    text-align: center;
`;

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;

//Before using SASS

// .category-container {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     column-gap: 20px;
//     row-gap: 50px;
// }

// .title {
//     font-size: 38px;
//     margin-bottom: 50px;
//     text-align: center;
// }
