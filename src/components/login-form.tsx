import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "./ui/spinner"
import { useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Eye, EyeOff } from "lucide-react"
import { useLoginMutation } from "@/queries/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({
      login: email,
      password: password,
    });
  }

  return (
    <form className={cn("flex flex-col gap-8", className)} {...props} onSubmit={onSubmit}>
      <FieldGroup className="gap-5">
        <Field>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="bg-card border-border focus:border-primary focus:ring-primary/20"
          />
        </Field>

        <Field>
          <InputGroup className="bg-card border-border focus:border-primary focus:ring-primary/20">
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroupAddon align="inline-end" onClick={togglePasswordVisibility} className="cursor-pointer">
              {showPassword ? <Eye /> : <EyeOff />}
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Button variant="link" color="primary" className="ml-auto">
          Forgot Password?
        </Button>
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          {loginMutation.isPending && <Spinner />}
          Sign in
        </Button>
      </FieldGroup>
    </form>
  )
}
