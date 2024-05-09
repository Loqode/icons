window.addEventListener("message", async function(event) {
  const { origin, data: { key, params } } = event;

  let result;
  let error;
  try {
    result = await window.function(...params);
  } catch (e) {
    result = undefined;
    try {
      error = e.toString();
    } catch (e) {
      error = "Exception can't be stringified.";
    }
  }

  const response = { key };
  if (result !== undefined) {
    // FIXME: Remove `type` once that's in staging
    response.result = { value: result };
  }
  if (error !== undefined) {
    response.error = error;
  }

  event.source.postMessage(response, "*");
});
