import { buttonBaseClasses, buttonVariantClasses } from '../theme/buttons';

function Button({ variant = 'secondary', type = 'button', onClick, children, className = '' }) {
  const combinedClassName = className
    ? `${buttonBaseClasses} ${buttonVariantClasses[variant]} ${className}`
    : `${buttonBaseClasses} ${buttonVariantClasses[variant]}`;

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}

export default Button;
