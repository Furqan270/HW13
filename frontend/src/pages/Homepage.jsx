import { HStack, VStack, Spinner, Text, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <VStack align="center" spacing={8} p={4} w="100%">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        List Buku
      </Text>

      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <HStack spacing={4} justify="center" w="100%">
          {books?.books?.map((book) => (
            <Books key={book.id} {...book} />
          ))}
        </HStack>
      )}
    </VStack>
  );
}
