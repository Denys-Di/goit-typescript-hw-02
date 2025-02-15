type ErrorMessageProps = {
  messageError: boolean;
};

const ErrorMessage = ({ messageError }: ErrorMessageProps) => {
  return (
    <div>
      {messageError && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
    </div>
  );
};

export default ErrorMessage;