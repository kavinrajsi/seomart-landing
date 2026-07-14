// Renders a three-part heading (before + accent + after). A space is inserted
// between parts, except when `after` begins with punctuation (e.g. the FAQ
// heading ends "...questions.").
export default function AccentHeading({ before, accent, after }) {
  const leadsWithPunctuation = after ? /^[.,;:!?)]/.test(after) : false
  return (
    <>
      {before}
      {before ? " " : ""}
      {accent}
      {after ? (leadsWithPunctuation ? after : ` ${after}`) : ""}
    </>
  )
}
