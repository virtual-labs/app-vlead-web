import * as React from "react";
import Box from "@mui/joy/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Divider from "@mui/joy/Divider";
import Link from '@mui/joy/Link';
import Chip from "@mui/joy/Chip";

import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const ExperimentCard = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  function linkClicked(event) {
    const href = data['Experiment URL'];
    event.preventDefault();

    let historyStack = localStorage.getItem('history');
    if (!historyStack) {
      historyStack = JSON.stringify([]);
    }

    historyStack = JSON.parse(historyStack);

    const index = historyStack.indexOf()
    historyStack = historyStack.filter(item => item.Name !== data.Name);
    historyStack.push(data);

    localStorage.setItem('history', JSON.stringify(historyStack));

    window.location = "//"+href;
  }

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={data['Image']}
            // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt="Image Missing"
          />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
        <Link href={"https://" + data["Experiment URL"]}  onClick={linkClicked}>
          {data["Experiment Name"]}
        </Link>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography level="body2" sx={{ mt: 0.5, mb: 0.75 }}>
          {data["Discipline Name"]}
        </Typography>
      </Box>

      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)} sx={{ mt: 'auto' }}>
        Learn More
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            m: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <AspectRatio ratio="2" sx={{ mb: "5px" }}>
            <img
              src={data["Image"]}
              // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt="Image Missing"
              width="100%"
              height="100%"
            />
          </AspectRatio>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            {data["Experiment Name"]}
          </Typography>
          <Divider sx={{ mb: "5px", mt: "7px" }} />
          <Typography id="modal-desc" textColor="text.tertiary" component="p">
            {data["Discipline Name"]}
          </Typography>
          <Typography textColor="text.tertiary" component="p">
            {data["Lab Name"]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "0.3rem",
              mt: "3px",
              mb: "6px",
            }}
          >
            {console.log(data["Tags"])}
            {(data["Tags"].split(",")).map((tag, i) => (
              <Chip key={i} size="sm" variant="outlined">
                {tag}
              </Chip>
            ))}
          </Box>
          <Divider sx={{ mt: "7px", mb: "2px" }} />
          <Typography textColor="text.tertiary" component="p">
            {data["Description"]}
          </Typography>
        </Sheet>
      </Modal>
    </Card>
  );
}