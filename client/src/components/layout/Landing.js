import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
	<div>
		<h1 className="text-center mb-5 display-3">Welcome to VK Reminder App</h1>
		<p className="text-center mb-5">
			Online service to create reminders. And they will be sent right into
      your VK messages.

    </p>

		<div className="pt-5">
			<Link to="/register" className="btn btn-primary btn-block">
				Register

      </Link>
			<Link to="/login" className="btn btn-success btn-block m-0">
				Login

      </Link>
		</div>

	</div>
);

export default Landing;
