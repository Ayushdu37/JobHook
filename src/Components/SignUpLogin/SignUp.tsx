import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { errorNotification, successNotification } from "../../Services/NotificationService";
const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
}


const SignUp = ()=>{

    const [data, setData] = useState<{[key:string]:string}>(form); 
    const [formError, setFormError] = useState<{[key:string]:string}>(form);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleChange = (event:any)=>{
      if(typeof(event) == "string"){
        setData({...data, accountType:event});
        return;
      }
      let name = event.target.name, value = event.target.value
      setData({...data, [name]:value})
      setFormError({...formError, [name]:signupValidation(name, value)})
      if(name==="password" && data.confirmPassword !== ""){
        let err="";
        if(data.confirmPassword !== value)err="Password do not match.";
        setFormError({...formError, [name]:signupValidation(name, value), confirmPassword:err});
      }
      if(name==="confirmPassword"){
        if(data.password !== value)setFormError({...formError, [name]:"Password do not match."});
          else setFormError({...formError, confirmPassword: ""});
      }
    }

    const handleSubmit = ()=>{
      let valid = true, newFormError:{[key:string]:string}={};
      for(let key in data){
        if(key==="accoutType")continue;
        if(key!=="confirmPassword")newFormError[key]=signupValidation(key,data[key]);
        else if(data[key] !== data["password"])newFormError[key]="Password do not match."
        if(newFormError[key])valid=false
      }
      setFormError(newFormError);
      if(valid === true){
        setLoading(true);
        registerUser(data).then((res)=>{
        console.log(res);
        setData(form);
        successNotification("Registered Successfully", "Redirecting to login page...");
        setTimeout(()=>{
          setLoading(false);
          navigate("/login");
        }, 4000)     
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
        errorNotification("Registration Failed", err.response.data.errorMessage);
      });
      }
    }

    return <><LoadingOverlay
              visible={loading}
              zIndex={1000}
              className="translate-x-1/2"
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'brightSun.4', type: 'bars' }}
            />
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput value={data.name} error={formError.name} onChange={handleChange} name="name" withAsterisk label="Full Name" placeholder="Your name"/>
        <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" withAsterisk leftSection={<IconAt size={16} />} label="Email" placeholder="Your email"/>
        <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
        <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} onChange={handleChange} name="confirmPassword" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm password" />
        <Radio.Group
      value={data.accountType}
      onChange={handleChange}
      label="You are?"
      withAsterisk
    >
        <Group mt="xs">
      <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
      <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />
      </Group>
    </Radio.Group>
        <Checkbox autoContrast label={<>I accept{' '}<Anchor>terms & conditions</Anchor></>}/>
        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>
        <div className="mx-auto">Have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={()=>{navigate("/login");setFormError(form); setData(form)}}>Login</span></div>
    </div>
    </>
}

export default SignUp;