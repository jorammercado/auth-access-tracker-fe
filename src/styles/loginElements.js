import styled from 'styled-components'


export const LoginBackground = styled.form`
  position: absolute;
  width: 460px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #212529;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px, 
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 10px;
  padding: 0 0 77px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: 40%;
    padding-bottom: 45px;
    box-shadow: none;
  }
`

export const LoginLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  

  
`

export const LoginHeader = styled.h2`
  width: 259px;
  height: 30px;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 40px;
  color: #f2f2f2;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
`

export const ErrorList = styled.ul`
  font-style: normal;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #f2f2f2;
  width:300px;

  @media screen and (max-width: 480px) {
    width: 299px;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
  }
`

export const FormInput = styled.input`
  width: 300px;
  height: 50px;
  background: #F8F5F5;
  border-radius: 10px;
  border: none;
  margin-bottom: 15px;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  color: rgba(0, 0, 0, 0.6);
  padding-left:25px;

  &:focus{
    outline: none;
  }

  &::placeholder{
    font-weight: normal;
  }

  @media screen and (max-width: 480px) {

    &:focus{
      box-shadow: 0px 4px 3px 0px rgb(51 51 51 / 40%);
      background: #FFFFFF;
    }
  }
`

export const LoginButton = styled.button`
  width: 300px;
  height: 50px;
  background: #cf2e2e;
  color: white;
  border: none;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  cursor: pointer;

  &:focus{
      outline: none;
  }
`

export const OkButton = styled.button`
  width: 300px;
  margin-bottom: -55px;
  height: 50px;
  background: #cf2e2e;
  border: none;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    margin-bottom: -25px;
  }

  @media screen and (max-width: 350px) {
    width: 250px;
  }

  &:focus{
      outline: none;
  }
`