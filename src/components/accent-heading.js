// Renders a three-part heading (before + accent + after) where the middle word
// gets the serif-accent styling. A space is inserted between parts, except when
// `after` begins with punctuation (e.g. the FAQ heading ends "...questions.").
export default function AccentHeading({ before, accent, after }) {
  const leadsWithPunctuation = after ? /^[.,;:!?)]/.test(after) : false
  return (
    <>
      {before}
      {before ? " " : ""}
      <span className="serif-accent">{accent}</span>
      {after ? (leadsWithPunctuation ? after : ` ${after}`) : ""}
    </>
  )
}
