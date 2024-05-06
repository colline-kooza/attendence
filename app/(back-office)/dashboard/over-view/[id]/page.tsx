import Admin from '@/components/over-view/Admin';
import getData from '@/utils/getData';
import Link from 'next/link';

export default async function StudentPage({ params: { id } }: any) {
  const [fetchedStudent] = await Promise.all([
    getData(`students/${id}`),
    // getData("check-in")
  ]);
  // console.log(attendance);
  if (!fetchedStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        fetchedStudent.role == "ADMIN" ? (
                <Admin  />
        ):(
          <main>
          <div className=" mt-[4rem]">
              <div className="max-w-lg mx-auto space-y-3 text-center">
                  <h3 className="text-indigo-600 font-semibold">
                      401 Error
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 text-4xl font-semibold sm:text-5xl">
                 Unauthorized Page
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                      Sorry, the page you are looking for is Unauthorized and cannot be reached at the moment.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                      <Link href="/dashboard" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg">
                          Go back
                      </Link>
                      <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                          Contact support
                      </Link>
                  </div>
              </div>
          </div>
      </main>
        )
      }
    </div>
  );
}
