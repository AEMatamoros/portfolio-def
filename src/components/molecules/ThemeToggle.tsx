import { Monitor, Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSystemDark, nextThemeMode } from "@/theme/theme";
import { useTheme } from "@/theme/useTheme";

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { mode, setMode } = useTheme();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMode(nextThemeMode(mode, getSystemDark()), {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "text-current hover:bg-current/10 hover:text-current dark:hover:bg-current/10",
        className,
      )}
      aria-label={t("theme.toggle", { mode: t(`theme.modes.${mode}`) })}
      onClick={handleClick}
    >
      {mode === "light" ? (
        <Sun aria-hidden />
      ) : mode === "dark" ? (
        <Moon aria-hidden />
      ) : (
        <Monitor aria-hidden />
      )}
    </Button>
  );
}
