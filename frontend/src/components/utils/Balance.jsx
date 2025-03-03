/// Copied from near-wallet project:
import BN from "bn.js";
import { utils } from "near-api-js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class Balance extends React.PureComponent {
  render() {
    const {
      amount,
      label = null,
      suffix = undefined,
      className = undefined,
      formulatedAmount = undefined,
      fracDigits = 5,
    } = this.props;

    if (!amount) {
      throw new Error("amount property should not be null");
    }

    const defaultLabel = "Ⓝ";

    let amountShow = !formulatedAmount
      ? formatNEAR(amount, fracDigits)
      : formulatedAmount;
    let amountPrecise = showInYocto(amount);
    return (
      <OverlayTrigger
        placement={"bottom"}
        overlay={<Tooltip>{amountPrecise}</Tooltip>}
      >
        <span className={className}>
          {amountShow}
          {suffix}
          &nbsp;
          {label ?? defaultLabel}
        </span>
      </OverlayTrigger>
    );
  }
}

export const formatNEAR = (amount, fracDigits = 5) => {
  let ret = utils.format.formatNearAmount(amount.toString(), fracDigits);

  if (amount === "0") {
    return amount;
  } else if (ret === "0") {
    return `<${!fracDigits ? `0` : `0.${"0".repeat((fracDigits || 1) - 1)}1`}`;
  }
  return ret;
};

export const showInYocto = (amountStr) => {
  return formatWithCommas(amountStr) + " yoctoⓃ";
};

export const formatWithCommas = (value) => {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(value)) {
    value = value.toString().replace(pattern, "$1,$2");
  }
  return value;
};

export default Balance;
