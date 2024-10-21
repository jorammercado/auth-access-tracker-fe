import styled from 'styled-components'

export const SignUpBackground = styled.div`
  position: absolute;
  width: 450px;
  height: 545px;
  top: 51.5%;
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
  padding: 0 0 40px 0;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    position: fixed;
    width: 90%;
    height: 75%;
    padding-bottom: 45px;
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    width: 80%;
  }
`

export const PasswordUpdateBackground = styled.div`
  position: absolute;
  width: 450px;
  height: 400px;
  top: 51%;
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
    height: 65%;
    padding-bottom: 45px;
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    width: 80%;
  }
`

export const PasswordResetBackground = styled.div`
  position: absolute;
  width: 450px;
  height: 400px;
  top: 51%;
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
    height: 45%;
    padding-bottom: 45px;
    box-shadow: none;
  }

  @media screen and (max-width: 400px) {
    width: 80%;
  }
`

export const SignUpButton = styled.button`  
  width: 310px;
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
  margin-top: 25px;
  

  &:focus{
      outline: none;
  }

  @media (max-width: 400px) {
        width: 100%;
    }
`