import { getShowreel } from "@/lib/payload";

// Turn a YouTube/Vimeo watch URL into an embeddable player URL. Returns null
// for anything else (treated as a direct video file).
function embedUrl(url) {
  if (!url) return null;
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export default async function Showreel() {
  const data = await getShowreel();
  if (!data) return null;

  const fileUrl =
    data.videoFile && typeof data.videoFile === "object"
      ? data.videoFile.url
      : null;
  const url = data.videoUrl || null;
  const poster =
    data.poster && typeof data.poster === "object" ? data.poster.url : null;

  // Nothing to show → render nothing.
  if (!fileUrl && !url) return null;

  const embed = fileUrl ? null : embedUrl(url);
  const videoSrc = fileUrl || (embed ? null : url);

  return (
    <section id="showreel" className="section-showreel mx-4 hidden scroll-mt-24 pb-10 lg:block lg:pb-30">
      <div className="mx-auto max-w-6xl">
        {data.heading && (
          <h2 className="mb-8 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-12 lg:text-6xl">
            {data.heading}
          </h2>
        )}

        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
          {embed ? (
            <iframe
              src={embed}
              title={data.heading || "Showreel"}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="h-full w-full object-cover"
              src={videoSrc}
              poster={poster || undefined}
              controls={!data.autoplay}
              autoPlay={!!data.autoplay}
              muted={!!data.autoplay}
              loop={!!data.autoplay}
              playsInline
              preload="metadata"
            />
          )}
        </div>
      </div>
    </section>
  );
}
