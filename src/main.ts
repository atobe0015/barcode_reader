import Quagga from "@ericblade/quagga2";

const buttonEl = document.querySelector<HTMLButtonElement>(
  "[data-reader-start]"
);
const streamEl = document.querySelector<HTMLDivElement>("[data-live-strearm]");
const outputEl = document.querySelector<HTMLInputElement>(
  "[data-bind-code-reader]"
);

buttonEl?.addEventListener("click", () => {
  runReader();
});

const runReader = () => {
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: streamEl ?? "",
      },
      numOfWorkers: 8,
      decoder: {
        readers: ["ean_reader", "ean_8_reader"],
        multiple: false,
      },
    },
    function (err) {
      console.log(err);
      if (err) return;
      Quagga.start();
      Quagga.onDetected((data) => {
        alert(data.codeResult.code);
      });
    }
  );
};
