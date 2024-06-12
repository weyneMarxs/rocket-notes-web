import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({theme, $isnew}) => $isnew ? "transparent" : theme.COLORS.BACKGROUND_900};
  color: ${({theme}) => theme.COLORS.GRAY_300};

  border: ${({theme, $isnew}) => $isnew ? `1px dashed ${theme.COLORS.GRAY_300}` : 'none'};
  margin-bottom: 8px;
  border-radius: 10px;
  padding-right: 16px;
  > button {
    border: none;
    background-color: transparent;
    > svg {
      font-size: 20px;
      color: ${({theme, $isnew}) => $isnew ? theme.COLORS.ORANGE : theme.COLORS.RED}
    }
  }
  > input {
    width: 100%;
    height: 56px;
    padding: 12px;
    color: ${({theme}) => theme.COLORS.WHITE};
    background-color: transparent;
    border:none;
    &::placeholder {
      color: ${({theme}) => theme.COLORS.GRAY_100};
    }
  }
`