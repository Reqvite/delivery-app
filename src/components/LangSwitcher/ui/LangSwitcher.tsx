import { useTranslation } from "react-i18next";

import { classNames } from "~/shared/lib/classNames";
import { Button, ButtonVariant } from "~/shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === "ua" ? "en" : "ua");
	};
	return (
		<Button
			className={classNames("", {}, [className])}
			variant={ButtonVariant.CLEAR}
			onClick={toggleLanguage}
		>
			{t("Language")}
		</Button>
	);
};
