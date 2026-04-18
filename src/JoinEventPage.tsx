import { Navigate, useLoaderData, useParams } from "react-router"
import { PlainFormField, ServerValidatedFormField } from "./FormFields"
import { useState } from "react"
import { expressApi } from "./express-api"

type Fields = {
  displayName: string;
  password: string;
}

type InputObject = {
  name: string,
  value: string,
  error?: string,
}

type Errors = {
  [key: string]: string | undefined;
};

export default function JoinEventPage() {
  const { joinEventPageData } = useLoaderData()
  const { joinToken } = useParams()
  console.log(joinEventPageData)

  const [fields, setFields] = useState<Fields>({ 
    displayName: '', 
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [_saveStatus, setSaveStatus] = useState<string>('READY');

  const onInputChange = ({name, value, error }: InputObject): void => {
    setFields(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateDisplayNameAvailability = async ({ fieldName, value}: { fieldName: string, value: string }) => {
    return expressApi.validation.checkAvailability({
      entity: 'participant',
      field: fieldName,
      value: value
    })
  }

  const missingRequiredFields = (): boolean => {
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    if (!fields.displayName) return true;
    if (errMessages.length) return true;
    return false;
  };

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();

    if (missingRequiredFields()) return

    if (!joinToken) {
      throw new Error("joinToken Missing")
    }

    console.log(fields)

    const joinEventData = {
      joinToken: joinToken,
      displayName: fields.displayName,
      joinPassword: joinEventPageData.requirePasswordToJoin ? fields.password : null
    }
    setSaveStatus('SAVING');
    try{
      const newParticipant = await expressApi.participantAuth.joinEvent(joinEventData)
      console.log(newParticipant)
      setSaveStatus('SUCCESS')
    } catch (error) {
      console.log(error)
      setSaveStatus('ERROR')
    }

  }

  return(
    <div>
      <h2>Welcome to <b>{joinEventPageData.title}</b></h2>
      <span>Enter a Display Name for the Event</span>
      <form onSubmit={onFormSubmit}>
        <ServerValidatedFormField
          name='displayName'
          type='text'
          value={fields.displayName}
          placeholder="Enter Display Name"
          inputClassName={"input[type='text'] w-full"}
          onChange={onInputChange}
          serverValidator={validateDisplayNameAvailability}
          required={true}
        />
        {joinEventPageData.requirePasswordToJoin && (
          <>
          <span>Enter Password</span>
          <PlainFormField
            name='password'
            type='password'
            value={fields.password}
            placeholder="Enter password to join"
            inputClassName={"input[type='password'] w-full"}
            onChange={onInputChange}
            required={true}
          />
          </>
        )}
              {
        {
          SAVING: (
            <div className="w-full flex justify-center">
              <button type='submit' className="whitespace-nowrap inline-flex items-center justify-center font-semibold ease-in duration-200 rounded-full outline outline-noct-blue text-noct-blue bg-inherit w-6/12 my-3 hover:bg-noct-blue hover:text-noct-white hover:outline-none">
                <p className="py-2">
                  Saving ...
                </p>
              </button>
            </div> 
          ),
          SUCCESS: <Navigate to='/dashboard' />,
          ERROR: (
            <div className="w-full flex justify-center">
              <button type='submit' className="whitespace-nowrap inline-flex items-center justify-center font-semibold ease-in duration-200 rounded-full outline outline-noct-blue text-noct-blue bg-inherit w-6/12 my-3 hover:bg-noct-blue hover:text-noct-white hover:outline-none">
                <p className="py-2">
                  Failed
                </p>
              </button>
            </div> 
          ),
          READY: (
            <div className="w-full flex justify-center">
              <button type='submit' className="whitespace-nowrap inline-flex items-center justify-center font-semibold ease-in duration-200 rounded-full outline outline-noct-blue text-noct-blue bg-inherit w-6/12 my-3 hover:bg-noct-blue hover:text-noct-white hover:outline-none">
                <p className="py-2">
                  Join Event
                </p>
              </button>
            </div> 
          ),
        }[_saveStatus]
      }
      </form>
    </div>
  )
}