import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type RouterNavLinkProps = Omit<
  React.ComponentProps<typeof RouterNavLink>,
  "className"
>;

interface NavLinkCompatProps extends RouterNavLinkProps {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = ({
  className,
  activeClassName,
  pendingClassName,
  to,
  ...props
}: NavLinkCompatProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive, isPending }) =>
        cn(className, isActive && activeClassName, isPending && pendingClassName)
      }
      {...props}
    />
  );
};

export { NavLink };