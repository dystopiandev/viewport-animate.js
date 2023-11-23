type Props = {
  property: string;
  value: string;
  isDefault: boolean;
}

function Row ({ property, value, isDefault }: Props) {
  return (
    <tr>
      <td className="property">
        { property }
      </td>
      <td className="value">
        { value }
        { isDefault && (<span>{" "} (default)</span>) }
      </td>
    </tr>
  )
}

export default Row;